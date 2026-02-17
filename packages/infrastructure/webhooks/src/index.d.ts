/**
 * @fated/infra-webhooks
 * Webhook Verification and Payload Parsing
 */
import { z } from 'zod';
export declare const GITHUB_WEBHOOK_SECRET: string;
/**
 * Verify GitHub webhook HMAC-SHA256 signature
 */
export declare function verifyGitHubSignature(payload: string, signature: string, secret?: string): boolean;
/**
 * Parse GitHub PR webhook payload
 */
export declare const GitHubPRPayloadSchema: z.ZodObject<{
    action: z.ZodString;
    pull_request: z.ZodObject<{
        id: z.ZodNumber;
        number: z.ZodNumber;
        title: z.ZodString;
        body: z.ZodNullable<z.ZodString>;
        html_url: z.ZodString;
        user: z.ZodObject<{
            login: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            login: string;
        }, {
            login: string;
        }>;
        merged: z.ZodNullable<z.ZodBoolean>;
        merged_at: z.ZodNullable<z.ZodString>;
        state: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        number: number;
        id: number;
        body: string | null;
        title: string;
        html_url: string;
        user: {
            login: string;
        };
        merged: boolean | null;
        merged_at: string | null;
        state: string;
    }, {
        number: number;
        id: number;
        body: string | null;
        title: string;
        html_url: string;
        user: {
            login: string;
        };
        merged: boolean | null;
        merged_at: string | null;
        state: string;
    }>;
    repository: z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
        full_name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: number;
        name: string;
        full_name: string;
    }, {
        id: number;
        name: string;
        full_name: string;
    }>;
}, "strip", z.ZodTypeAny, {
    action: string;
    pull_request: {
        number: number;
        id: number;
        body: string | null;
        title: string;
        html_url: string;
        user: {
            login: string;
        };
        merged: boolean | null;
        merged_at: string | null;
        state: string;
    };
    repository: {
        id: number;
        name: string;
        full_name: string;
    };
}, {
    action: string;
    pull_request: {
        number: number;
        id: number;
        body: string | null;
        title: string;
        html_url: string;
        user: {
            login: string;
        };
        merged: boolean | null;
        merged_at: string | null;
        state: string;
    };
    repository: {
        id: number;
        name: string;
        full_name: string;
    };
}>;
export type GitHubPRPayload = z.infer<typeof GitHubPRPayloadSchema>;
/**
 * Extract ticket ID from PR body
 * Looks for patterns like: "ticket-uuid", "closes ticket-uuid", "Fixes ticket-uuid"
 */
export declare function extractTicketId(prBody: string | null): string | null;
/**
 * Map GitHub PR action to system action
 */
export declare function mapPRActionToSystemEvent(action: string, pr: GitHubPRPayload['pull_request']): "CONTRIBUTION_SUBMITTED" | "CONTRIBUTION_REOPENED" | "CONTRIBUTION_MERGED" | "CONTRIBUTION_CLOSED" | "CONTRIBUTION_UPDATED" | null;
export declare const GitLabWebhookPayloadSchema: z.ZodObject<{
    object_kind: z.ZodString;
    object_attributes: z.ZodObject<{
        id: z.ZodNumber;
        title: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
        state: z.ZodString;
        merge_status: z.ZodString;
        source: z.ZodObject<{
            path_with_namespace: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            path_with_namespace: string;
        }, {
            path_with_namespace: string;
        }>;
        author: z.ZodObject<{
            username: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            username: string;
        }, {
            username: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        title: string;
        description: string | null;
        state: string;
        merge_status: string;
        source: {
            path_with_namespace: string;
        };
        author: {
            username: string;
        };
    }, {
        id: number;
        title: string;
        description: string | null;
        state: string;
        merge_status: string;
        source: {
            path_with_namespace: string;
        };
        author: {
            username: string;
        };
    }>;
    project: z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
        path_with_namespace: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: number;
        name: string;
        path_with_namespace: string;
    }, {
        id: number;
        name: string;
        path_with_namespace: string;
    }>;
}, "strip", z.ZodTypeAny, {
    project: {
        id: number;
        name: string;
        path_with_namespace: string;
    };
    object_kind: string;
    object_attributes: {
        id: number;
        title: string;
        description: string | null;
        state: string;
        merge_status: string;
        source: {
            path_with_namespace: string;
        };
        author: {
            username: string;
        };
    };
}, {
    project: {
        id: number;
        name: string;
        path_with_namespace: string;
    };
    object_kind: string;
    object_attributes: {
        id: number;
        title: string;
        description: string | null;
        state: string;
        merge_status: string;
        source: {
            path_with_namespace: string;
        };
        author: {
            username: string;
        };
    };
}>;
export type GitLabWebhookPayload = z.infer<typeof GitLabWebhookPayloadSchema>;
export interface WebhookEvent {
    source: 'github' | 'gitlab' | 'bitbucket';
    action: string;
    userId: string;
    timestamp: Date;
    payload: Record<string, unknown>;
}
export declare function createWebhookEvent(source: WebhookEvent['source'], action: string, userId: string, payload: Record<string, unknown>): WebhookEvent;
//# sourceMappingURL=index.d.ts.map