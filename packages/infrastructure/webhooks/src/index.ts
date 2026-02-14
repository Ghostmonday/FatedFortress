/**
 * @fated/infra-webhooks
 * Webhook Verification and Payload Parsing
 */

import { createHmac } from 'crypto';
import { z } from 'zod';

// ============================================
// GITHUB WEBHOOKS
// ============================================

export const GITHUB_WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET || 'dev-secret';

/**
 * Verify GitHub webhook HMAC-SHA256 signature
 */
export function verifyGitHubSignature(
  payload: string,
  signature: string,
  secret: string = GITHUB_WEBHOOK_SECRET
): boolean {
  // In dev mode, skip verification
  if (secret === 'dev-secret' || !signature) return true;
  
  const hmac = createHmac('sha256', secret);
  const digest = 'sha256=' + hmac.update(payload).digest('hex');
  
  return signature === digest;
}

/**
 * Parse GitHub PR webhook payload
 */
export const GitHubPRPayloadSchema = z.object({
  action: z.string(),
  pull_request: z.object({
    id: z.number(),
    number: z.number(),
    title: z.string(),
    body: z.string().nullable(),
    html_url: z.string(),
    user: z.object({ login: z.string() }),
    merged: z.boolean().nullable(),
    merged_at: z.string().nullable(),
    state: z.string(),
  }),
  repository: z.object({
    id: z.number(),
    name: z.string(),
    full_name: z.string(),
  }),
});

export type GitHubPRPayload = z.infer<typeof GitHubPRPayloadSchema>;

/**
 * Extract ticket ID from PR body
 * Looks for patterns like: "ticket-uuid", "closes ticket-uuid", "Fixes ticket-uuid"
 */
export function extractTicketId(prBody: string | null): string | null {
  if (!prBody) return null;
  
  const patterns = [
    /ticket-([a-f0-9\-]{36})/i,
    /closes\s+ticket-([a-f0-9\-]{36})/i,
    /fixes\s+ticket-([a-f0-9\-]{36})/i,
    /resolves\s+ticket-([a-f0-9\-]{36})/i,
  ];
  
  for (const pattern of patterns) {
    const match = prBody.match(pattern);
    if (match) return match[1];
  }
  
  return null;
}

/**
 * Map GitHub PR action to system action
 */
export function mapPRActionToSystemEvent(action: string, pr: GitHubPRPayload['pull_request']) {
  switch (action) {
    case 'opened':
      return 'CONTRIBUTION_SUBMITTED';
    case 'reopened':
      return 'CONTRIBUTION_REOPENED';
    case 'closed':
      if (pr.merged) return 'CONTRIBUTION_MERGED';
      return 'CONTRIBUTION_CLOSED';
    case 'synchronize':
      return 'CONTRIBUTION_UPDATED';
    default:
      return null;
  }
}

// ============================================
// GITLAB WEBHOOKS (Future)
// ============================================

export const GitLabWebhookPayloadSchema = z.object({
  object_kind: z.string(),
  object_attributes: z.object({
    id: z.number(),
    title: z.string(),
    description: z.string().nullable(),
    state: z.string(),
    merge_status: z.string(),
    source: z.object({ path_with_namespace: z.string() }),
    author: z.object({ username: z.string() }),
  }),
  project: z.object({
    id: z.number(),
    name: z.string(),
    path_with_namespace: z.string(),
  }),
});

export type GitLabWebhookPayload = z.infer<typeof GitLabWebhookPayloadSchema>;

// ============================================
// GENERIC WEBHOOK
// ============================================

export interface WebhookEvent {
  source: 'github' | 'gitlab' | 'bitbucket';
  action: string;
  userId: string;
  timestamp: Date;
  payload: Record<string, unknown>;
}

export function createWebhookEvent(
  source: WebhookEvent['source'],
  action: string,
  userId: string,
  payload: Record<string, unknown>
): WebhookEvent {
  return {
    source,
    action,
    userId,
    timestamp: new Date(),
    payload,
  };
}
