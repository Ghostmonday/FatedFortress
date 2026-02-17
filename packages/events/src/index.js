import { z } from "zod";
// Base Event
export const BaseEventSchema = z.object({
    id: z.string().uuid(),
    streamId: z.string(),
    timestamp: z.coerce.date(),
    metadata: z.record(z.any()).optional(),
});
// Specialty enum for domain-aware specialization
const SpecialtyEnum = z.enum(['BACKEND', 'FRONTEND', 'DEVOPS', 'SECURITY', 'RESEARCH']);
// 1. Contribution (The Work)
export const ContributionSubmittedSchema = BaseEventSchema.extend({
    type: z.literal("CONTRIBUTION_SUBMITTED"),
    payload: z.object({
        userId: z.string(),
        url: z.string().url(),
        complexityScore: z.number().min(1).max(10).optional(),
        specialty: SpecialtyEnum.optional(),
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
        specialty: SpecialtyEnum.optional(),
    }),
});
// 3. Project Lifecycle Events
export const ProjectCreatedSchema = BaseEventSchema.extend({
    type: z.literal("PROJECT_CREATED"),
    payload: z.object({
        projectId: z.string(),
        name: z.string(),
        domain: SpecialtyEnum,
    }),
});
export const SquadAssignedSchema = BaseEventSchema.extend({
    type: z.literal("SQUAD_ASSIGNED"),
    payload: z.object({
        projectId: z.string(),
        squadIds: z.array(z.string()),
    }),
});
export const ProjectCompletedSchema = BaseEventSchema.extend({
    type: z.literal("PROJECT_COMPLETED"),
    payload: z.object({
        projectId: z.string(),
        evaluations: z.array(z.object({
            userId: z.string(),
            score: z.number().min(0).max(1),
            feedback: z.string().optional(),
        })),
    }),
});
// The Union - All Event Types
export const AppEventSchema = z.discriminatedUnion("type", [
    ContributionSubmittedSchema,
    VerificationSubmittedSchema,
    ProjectCreatedSchema,
    SquadAssignedSchema,
    ProjectCompletedSchema,
]);
//# sourceMappingURL=index.js.map