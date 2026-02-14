import { z } from "zod";

// ============================================
// SPECIALTIES & ENUMS
// ============================================

export const SpecialtyEnum = z.enum(['BACKEND', 'FRONTEND', 'DEVOPS', 'SECURITY', 'RESEARCH']);
export type Specialty = z.infer<typeof SpecialtyEnum>;

export const TicketStatusEnum = z.enum(['OPEN', 'CLAIMED', 'COMPLETED', 'FORFEITED', 'CANCELLED']);
export type TicketStatus = z.infer<typeof TicketStatusEnum>;

export const StakeStatusEnum = z.enum(['ACTIVE', 'RELEASED', 'FORFEITED']);
export type StakeStatus = z.infer<typeof StakeStatusEnum>;

// ============================================
// BASE SCHEMAS
// ============================================

export const BaseEventSchema = z.object({
  id: z.string().uuid(),
  streamId: z.string(),
  timestamp: z.coerce.date(),
  metadata: z.record(z.any()).optional(),
});

export type BaseEvent = z.infer<typeof BaseEventSchema>;

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

export type ContributionSubmitted = z.infer<typeof ContributionSubmittedSchema>;

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

export type VerificationSubmitted = z.infer<typeof VerificationSubmittedSchema>;

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

export type ProjectCreated = z.infer<typeof ProjectCreatedSchema>;
export type SquadAssigned = z.infer<typeof SquadAssignedSchema>;
export type ProjectCompleted = z.infer<typeof ProjectCompletedSchema>;

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
    deadline: z.date(),
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

export type StakePlaced = z.infer<typeof StakePlacedSchema>;
export type StakeReleased = z.infer<typeof StakeReleasedSchema>;
export type TicketClaimed = z.infer<typeof TicketClaimedSchema>;
export type TicketCompleted = z.infer<typeof TicketCompletedSchema>;
export type ForfeitureExecuted = z.infer<typeof ForfeitureExecutedSchema>;

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

export type AppEvent = z.infer<typeof AppEventSchema>;

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

export type StakeInput = z.infer<typeof StakeInputSchema>;
export type UnstakeInput = z.infer<typeof UnstakeInputSchema>;
export type CreateTicketInput = z.infer<typeof CreateTicketInputSchema>;
export type ClaimTicketInput = z.infer<typeof ClaimTicketInputSchema>;
export type CompleteTicketInput = z.infer<typeof CompleteTicketInputSchema>;

// ============================================
// DOMAIN TYPES
// ============================================

export interface ActorState {
  actorId: string;
  currentRep: number;    // Liquid REP
  stakedRep: number;     // Locked REP
  currentXp: number;
  pendingXp: number;
  contributions: number;
  decayRate: number;
  lastActivity: Date | null;
  lastUpdated: Date;
  roleHistory: string[];
  successRate: Record<string, number>;
}

export interface Stake {
  id: string;
  actorId: string;
  amount: number;
  ticketId: string | null;
  createdAt: Date;
  releasedAt: Date | null;
  status: StakeStatus;
}

export interface Ticket {
  id: string;
  workPackageId: string;
  title: string;
  description: string | null;
  bondRequired: number;
  claimedBy: string | null;
  claimedAt: Date | null;
  deadline: Date;
  completedAt: Date | null;
  status: TicketStatus;
}
