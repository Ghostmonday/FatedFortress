import { z } from "zod";

// Base Event
export const BaseEventSchema = z.object({
  id: z.string().uuid(),
  streamId: z.string(),
  timestamp: z.coerce.date(),
  metadata: z.record(z.any()).optional(),
});

// 1. Contribution (The Work)
export const ContributionSubmittedSchema = BaseEventSchema.extend({
  type: z.literal("CONTRIBUTION_SUBMITTED"),
  payload: z.object({
    userId: z.string(),
    url: z.string().url(),
    complexityScore: z.number().min(1).max(10).optional(),
  }),
});

// 2. Verification (The Judgment)
export const VerificationSubmittedSchema = BaseEventSchema.extend({
  type: z.literal("VERIFICATION_SUBMITTED"),
  payload: z.object({
    verifierId: z.string(),
    targetContributionId: z.string(),
    verdict: z.literal("APPROVE").or(z.literal("REJECT")),
    qualityScore: z.number().min(1).max(5).optional(),
  }),
});

export type ContributionSubmitted = z.infer<typeof ContributionSubmittedSchema>;
export type VerificationSubmitted = z.infer<typeof VerificationSubmittedSchema>;

// The Union
export const AppEventSchema = z.discriminatedUnion("type", [
  ContributionSubmittedSchema,
  VerificationSubmittedSchema,
]);

export type AppEvent = z.infer<typeof AppEventSchema>;
