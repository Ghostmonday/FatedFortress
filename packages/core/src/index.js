import { z } from "zod";
// ============================================
// SPECIALTIES & ENUMS
// ============================================
export const SpecialtyEnum = z.enum(['BACKEND', 'FRONTEND', 'DEVOPS', 'SECURITY', 'RESEARCH']);
export const TicketStatusEnum = z.enum(['OPEN', 'CLAIMED', 'COMPLETED', 'FORFEITED', 'CANCELLED']);
export const StakeStatusEnum = z.enum(['ACTIVE', 'RELEASED', 'FORFEITED']);
// ============================================
// BASE SCHEMAS
// ============================================
export const BaseEventSchema = z.object({
    id: z.string().uuid(),
    streamId: z.string(),
    timestamp: z.coerce.date(),
    metadata: z.record(z.any()).optional(),
});
// ============================================
// CONTRIBUTION EVENTS
// ============================================
export const ContributionSubmittedSchema = BaseEventSchema.extend({
    type: z.literal("CONTRIBUTION_SUBMITTED"),
    payload: z.object({
        userId: z.string(),
        url: z.string().url(),
        complexityScore: z.number().min(1).max(10).optional(),
        specialty: SpecialtyEnum.optional(),
    }),
});
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
// ============================================
// PROJECT EVENTS
// ============================================
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
// ============================================
// BONDING EVENTS
// ============================================
export const StakePlacedSchema = BaseEventSchema.extend({
    type: z.literal("STAKE_PLACED"),
    payload: z.object({
        stakeId: z.string(),
        amount: z.number(),
        totalStaked: z.number(),
    }),
});
export const StakeReleasedSchema = BaseEventSchema.extend({
    type: z.literal("STAKE_RELEASED"),
    payload: z.object({
        stakeId: z.string(),
        amount: z.number(),
    }),
});
export const TicketClaimedSchema = BaseEventSchema.extend({
    type: z.literal("TICKET_CLAIMED"),
    payload: z.object({
        ticketId: z.string(),
        stakeId: z.string(),
        title: z.string(),
        deadline: z.coerce.date(),
    }),
});
export const TicketCompletedSchema = BaseEventSchema.extend({
    type: z.literal("TICKET_COMPLETED"),
    payload: z.object({
        ticketId: z.string(),
        title: z.string(),
        bondReturned: z.number(),
        verifiedBy: z.string(),
    }),
});
export const ForfeitureExecutedSchema = BaseEventSchema.extend({
    type: z.literal("FORFEITURE_EXECUTED"),
    payload: z.object({
        ticketId: z.string(),
        title: z.string(),
        originalStake: z.number(),
        slashed: z.number(),
        returned: z.number(),
    }),
});
// ============================================
// ALL EVENTS UNION
// ============================================
export const AppEventSchema = z.discriminatedUnion("type", [
    ContributionSubmittedSchema,
    VerificationSubmittedSchema,
    ProjectCreatedSchema,
    SquadAssignedSchema,
    ProjectCompletedSchema,
    StakePlacedSchema,
    StakeReleasedSchema,
    TicketClaimedSchema,
    TicketCompletedSchema,
    ForfeitureExecutedSchema,
]);
// ============================================
// INPUT SCHEMAS
// ============================================
export const StakeInputSchema = z.object({
    actorId: z.string().uuid(),
    amount: z.number().positive(),
});
export const UnstakeInputSchema = z.object({
    actorId: z.string().uuid(),
    stakeId: z.string().uuid(),
});
export const CreateTicketInputSchema = z.object({
    workPackageId: z.string(),
    title: z.string(),
    description: z.string().optional(),
    bondRequired: z.number().positive(),
    deadline: z.coerce.date(),
});
export const ClaimTicketInputSchema = z.object({
    actorId: z.string().uuid(),
    ticketId: z.string().uuid(),
});
export const CompleteTicketInputSchema = z.object({
    ticketId: z.string().uuid(),
    verifierId: z.string().uuid(),
});
//# sourceMappingURL=index.js.map