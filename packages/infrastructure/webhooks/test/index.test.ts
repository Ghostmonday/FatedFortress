/**
 * @fated/infra-webhooks
 * Webhook Tests
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  verifyGitHubSignature,
  extractTicketId,
  mapPRActionToSystemEvent,
  GitHubPRPayloadSchema,
} from '../src/index.js';

describe('verifyGitHubSignature', () => {
  it('should return true in dev mode (dev-secret)', () => {
    const result = verifyGitHubSignature('{}', '', 'dev-secret');
    expect(result).toBe(true);
  });

  it('should return true for valid signature', async () => {
    const payload = '{"action":"opened"}';
    const secret = 'test-secret';
    
    // Generate valid signature
    const crypto = await import('crypto');
    const hmac = crypto.createHmac('sha256', secret);
    const signature = 'sha256=' + hmac.update(payload).digest('hex');
    
    const result = verifyGitHubSignature(payload, signature, secret);
    expect(result).toBe(true);
  });

  it('should return false for invalid signature', () => {
    const result = verifyGitHubSignature('{}', 'sha256=invalid', 'test-secret');
    expect(result).toBe(false);
  });

  it('should return true when no signature provided (dev mode)', () => {
    const result = verifyGitHubSignature('{}', '', 'test-secret');
    expect(result).toBe(true);
  });
});

describe('extractTicketId', () => {
  it('should extract ticket ID from plain text', () => {
    const result = extractTicketId('ticket-550e8400-e29b-41d4-a716-446655440000');
    expect(result).toBe('550e8400-e29b-41d4-a716-446655440000');
  });

  it('should extract ticket ID from "closes" pattern', () => {
    const result = extractTicketId('This closes ticket-550e8400-e29b-41d4-a716-446655440000');
    expect(result).toBe('550e8400-e29b-41d4-a716-446655440000');
  });

  it('should extract ticket ID from "fixes" pattern', () => {
    const result = extractTicketId('Fixes ticket-550e8400-e29b-41d4-a716-446655440001');
    expect(result).toBe('550e8400-e29b-41d4-a716-446655440001');
  });

  it('should extract ticket ID from "resolves" pattern', () => {
    const result = extractTicketId('Resolves ticket-550e8400-e29b-41d4-a716-446655440002');
    expect(result).toBe('550e8400-e29b-41d4-a716-446655440002');
  });

  it('should return null for null input', () => {
    const result = extractTicketId(null);
    expect(result).toBeNull();
  });

  it('should return null for no ticket ID', () => {
    const result = extractTicketId('Just a regular PR description');
    expect(result).toBeNull();
  });
});

describe('mapPRActionToSystemEvent', () => {
  const mockPR = {
    id: 1,
    number: 1,
    title: 'Test PR',
    body: null,
    html_url: 'https://github.com/test/repo/pull/1',
    user: { login: 'testuser' },
    merged: false,
    merged_at: null,
    state: 'open',
  };

  it('should map opened to CONTRIBUTION_SUBMITTED', () => {
    const result = mapPRActionToSystemEvent('opened', mockPR);
    expect(result).toBe('CONTRIBUTION_SUBMITTED');
  });

  it('should map reopened to CONTRIBUTION_REOPENED', () => {
    const result = mapPRActionToSystemEvent('reopened', mockPR);
    expect(result).toBe('CONTRIBUTION_REOPENED');
  });

  it('should map closed (merged) to CONTRIBUTION_MERGED', () => {
    const mergedPR = { ...mockPR, merged: true };
    const result = mapPRActionToSystemEvent('closed', mergedPR);
    expect(result).toBe('CONTRIBUTION_MERGED');
  });

  it('should map closed (not merged) to CONTRIBUTION_CLOSED', () => {
    const result = mapPRActionToSystemEvent('closed', mockPR);
    expect(result).toBe('CONTRIBUTION_CLOSED');
  });

  it('should map synchronize to CONTRIBUTION_UPDATED', () => {
    const result = mapPRActionToSystemEvent('synchronize', mockPR);
    expect(result).toBe('CONTRIBUTION_UPDATED');
  });

  it('should return null for unknown action', () => {
    const result = mapPRActionToSystemEvent('unknown', mockPR);
    expect(result).toBeNull();
  });
});

describe('GitHubPRPayloadSchema', () => {
  it('should parse valid PR payload', () => {
    const validPayload = {
      action: 'opened',
      pull_request: {
        id: 1,
        number: 1,
        title: 'Test PR',
        body: 'ticket-550e8400-e29b-41d4-a716-446655440000',
        html_url: 'https://github.com/test/repo/pull/1',
        user: { login: 'testuser' },
        merged: false,
        merged_at: null,
        state: 'open',
      },
      repository: {
        id: 1,
        name: 'repo',
        full_name: 'test/repo',
      },
    };

    const result = GitHubPRPayloadSchema.parse(validPayload);
    expect(result.action).toBe('opened');
    expect(result.pull_request.user.login).toBe('testuser');
  });

  it('should reject invalid payload', () => {
    const invalidPayload = {
      action: 'opened',
      // Missing pull_request
    };

    expect(() => GitHubPRPayloadSchema.parse(invalidPayload)).toThrow();
  });
});
