import { FastifyInstance, FastifyRequest } from 'fastify';
import { createHmac } from 'crypto';
import { AppEvent } from '@fated/events';
import { InMemoryEventStore } from '@fated/event-store';
import { completeTicket, claimTicket, getTicket } from '@fated/bonding';

// Environment variable for webhook secret
const WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET || 'dev-secret';

interface GithubWebhookBody {
  action?: string;
  pull_request?: {
    user?: { login: string };
    body?: string;
    html_url?: string;
    merged?: boolean;
    merged_at?: string;
    state?: string;
  };
  repository?: {
    full_name?: string;
  };
}

interface RouteOptions {
  store: InMemoryEventStore;
}

export async function githubRoutes(fastify: FastifyInstance, options: RouteOptions) {
  const { store } = options;

  fastify.post<{ Body: GithubWebhookBody }>('/webhooks/github', async (request: FastifyRequest<{ Body: GithubWebhookBody }>, reply) => {
    const signature = request.headers['x-hub-signature-256'] as string;
    const id = request.headers['x-github-delivery'] as string;
    const eventName = request.headers['x-github-event'] as string;

    console.log(`[GitHub Webhook] Received ${eventName} event (${id})`);

    // Skip signature verification in development mode
    if (WEBHOOK_SECRET === 'dev-secret' || !signature) {
      console.log('[GitHub Webhook] ⚠️ Running in DEV mode - skipping signature verification');
    } else {
      if (!signature) {
        return reply.code(401).send({ error: 'No signature found' });
      }

      // Verify the payload signature using Node's crypto
      const payloadString = JSON.stringify(request.body);
      const expectedSignature = 'sha256=' + createHmac('sha256', WEBHOOK_SECRET)
        .update(payloadString, 'utf8')
        .digest('hex');

      // Timing-safe comparison
      if (signature !== expectedSignature) {
        console.log('[GitHub Webhook] ❌ Invalid signature');
        console.log(`Expected: ${expectedSignature}`);
        console.log(`Got: ${signature}`);
        return reply.code(401).send({ error: 'Invalid signature' });
      }
    }

    const payload = request.body;

    // Handle Pull Request Events
    if (eventName === 'pull_request') {
      const action = payload.action; // opened, closed, synchronize, etc.
      const pr = payload.pull_request;

      if (!pr) {
        return reply.send({ status: 'ignored', reason: 'No PR data' });
      }

      const user = pr.user?.login;
      const body = pr.body || '';
      const prUrl = pr.html_url || '';

      console.log(`[GitHub Webhook] PR Action: ${action} by ${user}`);

      // Extract Ticket ID from PR body (e.g., "Closes ticket-123" or "ticket-abc-123")
      const ticketMatch = body.match(/ticket-([a-f0-9\-]+)/i);
      const ticketId = ticketMatch ? ticketMatch[1] : null;

      if (!ticketId) {
        console.log(`[GitHub Webhook] No ticket ID found in PR body`);
        return reply.send({ status: 'ignored', reason: 'No ticket ID found in PR body' });
      }

      console.log(`[GitHub Webhook] 📋 Found ticket ID: ${ticketId}`);

      // Map actions to Fated Events
      if (action === 'opened' || action === 'reopened') {
        // PR Opened - Move ticket to IN_REVIEW
        const event: AppEvent = {
          type: 'CONTRIBUTION_SUBMITTED',
          actorId: user,
          streamId: `ticket-${ticketId}`,
          payload: {
            ticketId,
            prUrl,
            status: 'IN_REVIEW',
            action: 'PR_OPENED'
          },
          timestamp: new Date()
        };

        store.append(event);
        console.log(`[GitHub Webhook] ✅ Emitted CONTRIBUTION_SUBMITTED for ticket-${ticketId}`);

        return reply.send({ 
          success: true, 
          action: 'CONTRIBUTION_SUBMITTED',
          ticketId,
          user
        });
      }

      if (action === 'closed' && pr.merged) {
        // PR Merged - Complete the ticket
        
        // First, get the ticket to find the claimer
        const ticket = await getTicket(ticketId);
        
        if (!ticket) {
          console.log(`[GitHub Webhook] ❌ Ticket not found: ${ticketId}`);
          return reply.send({ status: 'error', reason: 'Ticket not found' });
        }

        // Use a system verifier ID (in production, this could be a specific reviewer)
        const verifierId = '00000000-0000-0000-0000-000000000000';

        try {
          // Complete the ticket - returns the stake
          const result = await completeTicket({ ticketId, verifierId });
          console.log(`[GitHub Webhook] ✅ Ticket completed, stake returned:`, result);
        } catch (err) {
          console.log(`[GitHub Webhook] ⚠️ Failed to complete ticket:`, (err as Error).message);
        }

        // Also emit event for the event store
        const event: AppEvent = {
          type: 'TICKET_COMPLETED',
          actorId: user,
          streamId: `ticket-${ticketId}`,
          payload: {
            ticketId,
            prUrl,
            mergedAt: pr.merged_at,
            action: 'PR_MERGED',
            completedBy: verifierId
          },
          timestamp: new Date()
        };

        store.append(event);
        console.log(`[GitHub Webhook] ✅ Emitted TICKET_COMPLETED for ticket-${ticketId}`);

        return reply.send({ 
          success: true, 
          action: 'TICKET_COMPLETED',
          ticketId,
          user
        });
      }

      if (action === 'synchronize') {
        // PR updated (new commits) - Just log, ticket stays in review
        console.log(`[GitHub Webhook] 📝 PR updated with new commits`);
        return reply.send({ 
          success: true, 
          action: 'PR_UPDATED',
          ticketId,
          user
        });
      }
    }

    // Handle other events we might care about
    if (eventName === 'push') {
      console.log(`[GitHub Webhook] Push event received`);
      // Could emit CONTRIBUTION_COMMITTED for direct pushes to main
      // For now, we'll focus on PRs
    }

    return reply.send({ success: true, status: 'event_received' });
  });

  // Health check endpoint for webhook configuration
  fastify.get('/webhooks/github/health', async () => {
    return { 
      status: 'ok', 
      mode: WEBHOOK_SECRET === 'dev-secret' ? 'development' : 'production',
      events_supported: ['pull_request', 'push']
    };
  });
}
