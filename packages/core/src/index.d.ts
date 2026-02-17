import { z } from "zod";
export declare const SpecialtyEnum: z.ZodEnum<["BACKEND", "FRONTEND", "DEVOPS", "SECURITY", "RESEARCH"]>;
export type Specialty = z.infer<typeof SpecialtyEnum>;
export declare const TicketStatusEnum: z.ZodEnum<["OPEN", "CLAIMED", "COMPLETED", "FORFEITED", "CANCELLED"]>;
export type TicketStatus = z.infer<typeof TicketStatusEnum>;
export declare const StakeStatusEnum: z.ZodEnum<["ACTIVE", "RELEASED", "FORFEITED"]>;
export type StakeStatus = z.infer<typeof StakeStatusEnum>;
export declare const BaseEventSchema: z.ZodObject<{
    id: z.ZodString;
    streamId: z.ZodString;
    timestamp: z.ZodDate;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    timestamp: Date;
    id: string;
    streamId: string;
    metadata?: Record<string, any> | undefined;
}, {
    timestamp: Date;
    id: string;
    streamId: string;
    metadata?: Record<string, any> | undefined;
}>;
export type BaseEvent = z.infer<typeof BaseEventSchema>;
export declare const ContributionSubmittedSchema: z.ZodObject<{
    id: z.ZodString;
    streamId: z.ZodString;
    timestamp: z.ZodDate;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
} & {
    type: z.ZodLiteral<"CONTRIBUTION_SUBMITTED">;
    payload: z.ZodObject<{
        userId: z.ZodString;
        url: z.ZodString;
        complexityScore: z.ZodOptional<z.ZodNumber>;
        specialty: z.ZodOptional<z.ZodEnum<["BACKEND", "FRONTEND", "DEVOPS", "SECURITY", "RESEARCH"]>>;
    }, "strip", z.ZodTypeAny, {
        userId: string;
        url: string;
        complexityScore?: number | undefined;
        specialty?: "BACKEND" | "FRONTEND" | "DEVOPS" | "SECURITY" | "RESEARCH" | undefined;
    }, {
        userId: string;
        url: string;
        complexityScore?: number | undefined;
        specialty?: "BACKEND" | "FRONTEND" | "DEVOPS" | "SECURITY" | "RESEARCH" | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    timestamp: Date;
    type: "CONTRIBUTION_SUBMITTED";
    id: string;
    streamId: string;
    payload: {
        userId: string;
        url: string;
        complexityScore?: number | undefined;
        specialty?: "BACKEND" | "FRONTEND" | "DEVOPS" | "SECURITY" | "RESEARCH" | undefined;
    };
    metadata?: Record<string, any> | undefined;
}, {
    timestamp: Date;
    type: "CONTRIBUTION_SUBMITTED";
    id: string;
    streamId: string;
    payload: {
        userId: string;
        url: string;
        complexityScore?: number | undefined;
        specialty?: "BACKEND" | "FRONTEND" | "DEVOPS" | "SECURITY" | "RESEARCH" | undefined;
    };
    metadata?: Record<string, any> | undefined;
}>;
export type ContributionSubmitted = z.infer<typeof ContributionSubmittedSchema>;
export declare const VerificationSubmittedSchema: z.ZodObject<{
    id: z.ZodString;
    streamId: z.ZodString;
    timestamp: z.ZodDate;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
} & {
    type: z.ZodLiteral<"VERIFICATION_SUBMITTED">;
    payload: z.ZodObject<{
        verifierId: z.ZodString;
        targetContributionId: z.ZodString;
        verdict: z.ZodUnion<[z.ZodLiteral<"APPROVE">, z.ZodLiteral<"REJECT">]>;
        qualityScore: z.ZodOptional<z.ZodNumber>;
        specialty: z.ZodOptional<z.ZodEnum<["BACKEND", "FRONTEND", "DEVOPS", "SECURITY", "RESEARCH"]>>;
    }, "strip", z.ZodTypeAny, {
        verifierId: string;
        targetContributionId: string;
        verdict: "APPROVE" | "REJECT";
        specialty?: "BACKEND" | "FRONTEND" | "DEVOPS" | "SECURITY" | "RESEARCH" | undefined;
        qualityScore?: number | undefined;
    }, {
        verifierId: string;
        targetContributionId: string;
        verdict: "APPROVE" | "REJECT";
        specialty?: "BACKEND" | "FRONTEND" | "DEVOPS" | "SECURITY" | "RESEARCH" | undefined;
        qualityScore?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    timestamp: Date;
    type: "VERIFICATION_SUBMITTED";
    id: string;
    streamId: string;
    payload: {
        verifierId: string;
        targetContributionId: string;
        verdict: "APPROVE" | "REJECT";
        specialty?: "BACKEND" | "FRONTEND" | "DEVOPS" | "SECURITY" | "RESEARCH" | undefined;
        qualityScore?: number | undefined;
    };
    metadata?: Record<string, any> | undefined;
}, {
    timestamp: Date;
    type: "VERIFICATION_SUBMITTED";
    id: string;
    streamId: string;
    payload: {
        verifierId: string;
        targetContributionId: string;
        verdict: "APPROVE" | "REJECT";
        specialty?: "BACKEND" | "FRONTEND" | "DEVOPS" | "SECURITY" | "RESEARCH" | undefined;
        qualityScore?: number | undefined;
    };
    metadata?: Record<string, any> | undefined;
}>;
export type VerificationSubmitted = z.infer<typeof VerificationSubmittedSchema>;
export declare const ProjectCreatedSchema: z.ZodObject<{
    id: z.ZodString;
    streamId: z.ZodString;
    timestamp: z.ZodDate;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
} & {
    type: z.ZodLiteral<"PROJECT_CREATED">;
    payload: z.ZodObject<{
        projectId: z.ZodString;
        name: z.ZodString;
        domain: z.ZodEnum<["BACKEND", "FRONTEND", "DEVOPS", "SECURITY", "RESEARCH"]>;
    }, "strip", z.ZodTypeAny, {
        projectId: string;
        domain: "BACKEND" | "FRONTEND" | "DEVOPS" | "SECURITY" | "RESEARCH";
        name: string;
    }, {
        projectId: string;
        domain: "BACKEND" | "FRONTEND" | "DEVOPS" | "SECURITY" | "RESEARCH";
        name: string;
    }>;
}, "strip", z.ZodTypeAny, {
    timestamp: Date;
    type: "PROJECT_CREATED";
    id: string;
    streamId: string;
    payload: {
        projectId: string;
        domain: "BACKEND" | "FRONTEND" | "DEVOPS" | "SECURITY" | "RESEARCH";
        name: string;
    };
    metadata?: Record<string, any> | undefined;
}, {
    timestamp: Date;
    type: "PROJECT_CREATED";
    id: string;
    streamId: string;
    payload: {
        projectId: string;
        domain: "BACKEND" | "FRONTEND" | "DEVOPS" | "SECURITY" | "RESEARCH";
        name: string;
    };
    metadata?: Record<string, any> | undefined;
}>;
export declare const SquadAssignedSchema: z.ZodObject<{
    id: z.ZodString;
    streamId: z.ZodString;
    timestamp: z.ZodDate;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
} & {
    type: z.ZodLiteral<"SQUAD_ASSIGNED">;
    payload: z.ZodObject<{
        projectId: z.ZodString;
        squadIds: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        projectId: string;
        squadIds: string[];
    }, {
        projectId: string;
        squadIds: string[];
    }>;
}, "strip", z.ZodTypeAny, {
    timestamp: Date;
    type: "SQUAD_ASSIGNED";
    id: string;
    streamId: string;
    payload: {
        projectId: string;
        squadIds: string[];
    };
    metadata?: Record<string, any> | undefined;
}, {
    timestamp: Date;
    type: "SQUAD_ASSIGNED";
    id: string;
    streamId: string;
    payload: {
        projectId: string;
        squadIds: string[];
    };
    metadata?: Record<string, any> | undefined;
}>;
export declare const ProjectCompletedSchema: z.ZodObject<{
    id: z.ZodString;
    streamId: z.ZodString;
    timestamp: z.ZodDate;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
} & {
    type: z.ZodLiteral<"PROJECT_COMPLETED">;
    payload: z.ZodObject<{
        projectId: z.ZodString;
        evaluations: z.ZodArray<z.ZodObject<{
            userId: z.ZodString;
            score: z.ZodNumber;
            feedback: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            score: number;
            userId: string;
            feedback?: string | undefined;
        }, {
            score: number;
            userId: string;
            feedback?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        projectId: string;
        evaluations: {
            score: number;
            userId: string;
            feedback?: string | undefined;
        }[];
    }, {
        projectId: string;
        evaluations: {
            score: number;
            userId: string;
            feedback?: string | undefined;
        }[];
    }>;
}, "strip", z.ZodTypeAny, {
    timestamp: Date;
    type: "PROJECT_COMPLETED";
    id: string;
    streamId: string;
    payload: {
        projectId: string;
        evaluations: {
            score: number;
            userId: string;
            feedback?: string | undefined;
        }[];
    };
    metadata?: Record<string, any> | undefined;
}, {
    timestamp: Date;
    type: "PROJECT_COMPLETED";
    id: string;
    streamId: string;
    payload: {
        projectId: string;
        evaluations: {
            score: number;
            userId: string;
            feedback?: string | undefined;
        }[];
    };
    metadata?: Record<string, any> | undefined;
}>;
export type ProjectCreated = z.infer<typeof ProjectCreatedSchema>;
export type SquadAssigned = z.infer<typeof SquadAssignedSchema>;
export type ProjectCompleted = z.infer<typeof ProjectCompletedSchema>;
export declare const StakePlacedSchema: z.ZodObject<{
    id: z.ZodString;
    streamId: z.ZodString;
    timestamp: z.ZodDate;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
} & {
    type: z.ZodLiteral<"STAKE_PLACED">;
    payload: z.ZodObject<{
        stakeId: z.ZodString;
        amount: z.ZodNumber;
        totalStaked: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        stakeId: string;
        amount: number;
        totalStaked: number;
    }, {
        stakeId: string;
        amount: number;
        totalStaked: number;
    }>;
}, "strip", z.ZodTypeAny, {
    timestamp: Date;
    type: "STAKE_PLACED";
    id: string;
    streamId: string;
    payload: {
        stakeId: string;
        amount: number;
        totalStaked: number;
    };
    metadata?: Record<string, any> | undefined;
}, {
    timestamp: Date;
    type: "STAKE_PLACED";
    id: string;
    streamId: string;
    payload: {
        stakeId: string;
        amount: number;
        totalStaked: number;
    };
    metadata?: Record<string, any> | undefined;
}>;
export declare const StakeReleasedSchema: z.ZodObject<{
    id: z.ZodString;
    streamId: z.ZodString;
    timestamp: z.ZodDate;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
} & {
    type: z.ZodLiteral<"STAKE_RELEASED">;
    payload: z.ZodObject<{
        stakeId: z.ZodString;
        amount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        stakeId: string;
        amount: number;
    }, {
        stakeId: string;
        amount: number;
    }>;
}, "strip", z.ZodTypeAny, {
    timestamp: Date;
    type: "STAKE_RELEASED";
    id: string;
    streamId: string;
    payload: {
        stakeId: string;
        amount: number;
    };
    metadata?: Record<string, any> | undefined;
}, {
    timestamp: Date;
    type: "STAKE_RELEASED";
    id: string;
    streamId: string;
    payload: {
        stakeId: string;
        amount: number;
    };
    metadata?: Record<string, any> | undefined;
}>;
export declare const TicketClaimedSchema: z.ZodObject<{
    id: z.ZodString;
    streamId: z.ZodString;
    timestamp: z.ZodDate;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
} & {
    type: z.ZodLiteral<"TICKET_CLAIMED">;
    payload: z.ZodObject<{
        ticketId: z.ZodString;
        stakeId: z.ZodString;
        title: z.ZodString;
        deadline: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        stakeId: string;
        ticketId: string;
        title: string;
        deadline: Date;
    }, {
        stakeId: string;
        ticketId: string;
        title: string;
        deadline: Date;
    }>;
}, "strip", z.ZodTypeAny, {
    timestamp: Date;
    type: "TICKET_CLAIMED";
    id: string;
    streamId: string;
    payload: {
        stakeId: string;
        ticketId: string;
        title: string;
        deadline: Date;
    };
    metadata?: Record<string, any> | undefined;
}, {
    timestamp: Date;
    type: "TICKET_CLAIMED";
    id: string;
    streamId: string;
    payload: {
        stakeId: string;
        ticketId: string;
        title: string;
        deadline: Date;
    };
    metadata?: Record<string, any> | undefined;
}>;
export declare const TicketCompletedSchema: z.ZodObject<{
    id: z.ZodString;
    streamId: z.ZodString;
    timestamp: z.ZodDate;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
} & {
    type: z.ZodLiteral<"TICKET_COMPLETED">;
    payload: z.ZodObject<{
        ticketId: z.ZodString;
        title: z.ZodString;
        bondReturned: z.ZodNumber;
        verifiedBy: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        ticketId: string;
        title: string;
        bondReturned: number;
        verifiedBy: string;
    }, {
        ticketId: string;
        title: string;
        bondReturned: number;
        verifiedBy: string;
    }>;
}, "strip", z.ZodTypeAny, {
    timestamp: Date;
    type: "TICKET_COMPLETED";
    id: string;
    streamId: string;
    payload: {
        ticketId: string;
        title: string;
        bondReturned: number;
        verifiedBy: string;
    };
    metadata?: Record<string, any> | undefined;
}, {
    timestamp: Date;
    type: "TICKET_COMPLETED";
    id: string;
    streamId: string;
    payload: {
        ticketId: string;
        title: string;
        bondReturned: number;
        verifiedBy: string;
    };
    metadata?: Record<string, any> | undefined;
}>;
export declare const ForfeitureExecutedSchema: z.ZodObject<{
    id: z.ZodString;
    streamId: z.ZodString;
    timestamp: z.ZodDate;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
} & {
    type: z.ZodLiteral<"FORFEITURE_EXECUTED">;
    payload: z.ZodObject<{
        ticketId: z.ZodString;
        title: z.ZodString;
        originalStake: z.ZodNumber;
        slashed: z.ZodNumber;
        returned: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        ticketId: string;
        title: string;
        originalStake: number;
        slashed: number;
        returned: number;
    }, {
        ticketId: string;
        title: string;
        originalStake: number;
        slashed: number;
        returned: number;
    }>;
}, "strip", z.ZodTypeAny, {
    timestamp: Date;
    type: "FORFEITURE_EXECUTED";
    id: string;
    streamId: string;
    payload: {
        ticketId: string;
        title: string;
        originalStake: number;
        slashed: number;
        returned: number;
    };
    metadata?: Record<string, any> | undefined;
}, {
    timestamp: Date;
    type: "FORFEITURE_EXECUTED";
    id: string;
    streamId: string;
    payload: {
        ticketId: string;
        title: string;
        originalStake: number;
        slashed: number;
        returned: number;
    };
    metadata?: Record<string, any> | undefined;
}>;
export type StakePlaced = z.infer<typeof StakePlacedSchema>;
export type StakeReleased = z.infer<typeof StakeReleasedSchema>;
export type TicketClaimed = z.infer<typeof TicketClaimedSchema>;
export type TicketCompleted = z.infer<typeof TicketCompletedSchema>;
export type ForfeitureExecuted = z.infer<typeof ForfeitureExecutedSchema>;
export declare const AppEventSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    id: z.ZodString;
    streamId: z.ZodString;
    timestamp: z.ZodDate;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
} & {
    type: z.ZodLiteral<"CONTRIBUTION_SUBMITTED">;
    payload: z.ZodObject<{
        userId: z.ZodString;
        url: z.ZodString;
        complexityScore: z.ZodOptional<z.ZodNumber>;
        specialty: z.ZodOptional<z.ZodEnum<["BACKEND", "FRONTEND", "DEVOPS", "SECURITY", "RESEARCH"]>>;
    }, "strip", z.ZodTypeAny, {
        userId: string;
        url: string;
        complexityScore?: number | undefined;
        specialty?: "BACKEND" | "FRONTEND" | "DEVOPS" | "SECURITY" | "RESEARCH" | undefined;
    }, {
        userId: string;
        url: string;
        complexityScore?: number | undefined;
        specialty?: "BACKEND" | "FRONTEND" | "DEVOPS" | "SECURITY" | "RESEARCH" | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    timestamp: Date;
    type: "CONTRIBUTION_SUBMITTED";
    id: string;
    streamId: string;
    payload: {
        userId: string;
        url: string;
        complexityScore?: number | undefined;
        specialty?: "BACKEND" | "FRONTEND" | "DEVOPS" | "SECURITY" | "RESEARCH" | undefined;
    };
    metadata?: Record<string, any> | undefined;
}, {
    timestamp: Date;
    type: "CONTRIBUTION_SUBMITTED";
    id: string;
    streamId: string;
    payload: {
        userId: string;
        url: string;
        complexityScore?: number | undefined;
        specialty?: "BACKEND" | "FRONTEND" | "DEVOPS" | "SECURITY" | "RESEARCH" | undefined;
    };
    metadata?: Record<string, any> | undefined;
}>, z.ZodObject<{
    id: z.ZodString;
    streamId: z.ZodString;
    timestamp: z.ZodDate;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
} & {
    type: z.ZodLiteral<"VERIFICATION_SUBMITTED">;
    payload: z.ZodObject<{
        verifierId: z.ZodString;
        targetContributionId: z.ZodString;
        verdict: z.ZodUnion<[z.ZodLiteral<"APPROVE">, z.ZodLiteral<"REJECT">]>;
        qualityScore: z.ZodOptional<z.ZodNumber>;
        specialty: z.ZodOptional<z.ZodEnum<["BACKEND", "FRONTEND", "DEVOPS", "SECURITY", "RESEARCH"]>>;
    }, "strip", z.ZodTypeAny, {
        verifierId: string;
        targetContributionId: string;
        verdict: "APPROVE" | "REJECT";
        specialty?: "BACKEND" | "FRONTEND" | "DEVOPS" | "SECURITY" | "RESEARCH" | undefined;
        qualityScore?: number | undefined;
    }, {
        verifierId: string;
        targetContributionId: string;
        verdict: "APPROVE" | "REJECT";
        specialty?: "BACKEND" | "FRONTEND" | "DEVOPS" | "SECURITY" | "RESEARCH" | undefined;
        qualityScore?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    timestamp: Date;
    type: "VERIFICATION_SUBMITTED";
    id: string;
    streamId: string;
    payload: {
        verifierId: string;
        targetContributionId: string;
        verdict: "APPROVE" | "REJECT";
        specialty?: "BACKEND" | "FRONTEND" | "DEVOPS" | "SECURITY" | "RESEARCH" | undefined;
        qualityScore?: number | undefined;
    };
    metadata?: Record<string, any> | undefined;
}, {
    timestamp: Date;
    type: "VERIFICATION_SUBMITTED";
    id: string;
    streamId: string;
    payload: {
        verifierId: string;
        targetContributionId: string;
        verdict: "APPROVE" | "REJECT";
        specialty?: "BACKEND" | "FRONTEND" | "DEVOPS" | "SECURITY" | "RESEARCH" | undefined;
        qualityScore?: number | undefined;
    };
    metadata?: Record<string, any> | undefined;
}>, z.ZodObject<{
    id: z.ZodString;
    streamId: z.ZodString;
    timestamp: z.ZodDate;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
} & {
    type: z.ZodLiteral<"PROJECT_CREATED">;
    payload: z.ZodObject<{
        projectId: z.ZodString;
        name: z.ZodString;
        domain: z.ZodEnum<["BACKEND", "FRONTEND", "DEVOPS", "SECURITY", "RESEARCH"]>;
    }, "strip", z.ZodTypeAny, {
        projectId: string;
        domain: "BACKEND" | "FRONTEND" | "DEVOPS" | "SECURITY" | "RESEARCH";
        name: string;
    }, {
        projectId: string;
        domain: "BACKEND" | "FRONTEND" | "DEVOPS" | "SECURITY" | "RESEARCH";
        name: string;
    }>;
}, "strip", z.ZodTypeAny, {
    timestamp: Date;
    type: "PROJECT_CREATED";
    id: string;
    streamId: string;
    payload: {
        projectId: string;
        domain: "BACKEND" | "FRONTEND" | "DEVOPS" | "SECURITY" | "RESEARCH";
        name: string;
    };
    metadata?: Record<string, any> | undefined;
}, {
    timestamp: Date;
    type: "PROJECT_CREATED";
    id: string;
    streamId: string;
    payload: {
        projectId: string;
        domain: "BACKEND" | "FRONTEND" | "DEVOPS" | "SECURITY" | "RESEARCH";
        name: string;
    };
    metadata?: Record<string, any> | undefined;
}>, z.ZodObject<{
    id: z.ZodString;
    streamId: z.ZodString;
    timestamp: z.ZodDate;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
} & {
    type: z.ZodLiteral<"SQUAD_ASSIGNED">;
    payload: z.ZodObject<{
        projectId: z.ZodString;
        squadIds: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        projectId: string;
        squadIds: string[];
    }, {
        projectId: string;
        squadIds: string[];
    }>;
}, "strip", z.ZodTypeAny, {
    timestamp: Date;
    type: "SQUAD_ASSIGNED";
    id: string;
    streamId: string;
    payload: {
        projectId: string;
        squadIds: string[];
    };
    metadata?: Record<string, any> | undefined;
}, {
    timestamp: Date;
    type: "SQUAD_ASSIGNED";
    id: string;
    streamId: string;
    payload: {
        projectId: string;
        squadIds: string[];
    };
    metadata?: Record<string, any> | undefined;
}>, z.ZodObject<{
    id: z.ZodString;
    streamId: z.ZodString;
    timestamp: z.ZodDate;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
} & {
    type: z.ZodLiteral<"PROJECT_COMPLETED">;
    payload: z.ZodObject<{
        projectId: z.ZodString;
        evaluations: z.ZodArray<z.ZodObject<{
            userId: z.ZodString;
            score: z.ZodNumber;
            feedback: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            score: number;
            userId: string;
            feedback?: string | undefined;
        }, {
            score: number;
            userId: string;
            feedback?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        projectId: string;
        evaluations: {
            score: number;
            userId: string;
            feedback?: string | undefined;
        }[];
    }, {
        projectId: string;
        evaluations: {
            score: number;
            userId: string;
            feedback?: string | undefined;
        }[];
    }>;
}, "strip", z.ZodTypeAny, {
    timestamp: Date;
    type: "PROJECT_COMPLETED";
    id: string;
    streamId: string;
    payload: {
        projectId: string;
        evaluations: {
            score: number;
            userId: string;
            feedback?: string | undefined;
        }[];
    };
    metadata?: Record<string, any> | undefined;
}, {
    timestamp: Date;
    type: "PROJECT_COMPLETED";
    id: string;
    streamId: string;
    payload: {
        projectId: string;
        evaluations: {
            score: number;
            userId: string;
            feedback?: string | undefined;
        }[];
    };
    metadata?: Record<string, any> | undefined;
}>, z.ZodObject<{
    id: z.ZodString;
    streamId: z.ZodString;
    timestamp: z.ZodDate;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
} & {
    type: z.ZodLiteral<"STAKE_PLACED">;
    payload: z.ZodObject<{
        stakeId: z.ZodString;
        amount: z.ZodNumber;
        totalStaked: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        stakeId: string;
        amount: number;
        totalStaked: number;
    }, {
        stakeId: string;
        amount: number;
        totalStaked: number;
    }>;
}, "strip", z.ZodTypeAny, {
    timestamp: Date;
    type: "STAKE_PLACED";
    id: string;
    streamId: string;
    payload: {
        stakeId: string;
        amount: number;
        totalStaked: number;
    };
    metadata?: Record<string, any> | undefined;
}, {
    timestamp: Date;
    type: "STAKE_PLACED";
    id: string;
    streamId: string;
    payload: {
        stakeId: string;
        amount: number;
        totalStaked: number;
    };
    metadata?: Record<string, any> | undefined;
}>, z.ZodObject<{
    id: z.ZodString;
    streamId: z.ZodString;
    timestamp: z.ZodDate;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
} & {
    type: z.ZodLiteral<"STAKE_RELEASED">;
    payload: z.ZodObject<{
        stakeId: z.ZodString;
        amount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        stakeId: string;
        amount: number;
    }, {
        stakeId: string;
        amount: number;
    }>;
}, "strip", z.ZodTypeAny, {
    timestamp: Date;
    type: "STAKE_RELEASED";
    id: string;
    streamId: string;
    payload: {
        stakeId: string;
        amount: number;
    };
    metadata?: Record<string, any> | undefined;
}, {
    timestamp: Date;
    type: "STAKE_RELEASED";
    id: string;
    streamId: string;
    payload: {
        stakeId: string;
        amount: number;
    };
    metadata?: Record<string, any> | undefined;
}>, z.ZodObject<{
    id: z.ZodString;
    streamId: z.ZodString;
    timestamp: z.ZodDate;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
} & {
    type: z.ZodLiteral<"TICKET_CLAIMED">;
    payload: z.ZodObject<{
        ticketId: z.ZodString;
        stakeId: z.ZodString;
        title: z.ZodString;
        deadline: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        stakeId: string;
        ticketId: string;
        title: string;
        deadline: Date;
    }, {
        stakeId: string;
        ticketId: string;
        title: string;
        deadline: Date;
    }>;
}, "strip", z.ZodTypeAny, {
    timestamp: Date;
    type: "TICKET_CLAIMED";
    id: string;
    streamId: string;
    payload: {
        stakeId: string;
        ticketId: string;
        title: string;
        deadline: Date;
    };
    metadata?: Record<string, any> | undefined;
}, {
    timestamp: Date;
    type: "TICKET_CLAIMED";
    id: string;
    streamId: string;
    payload: {
        stakeId: string;
        ticketId: string;
        title: string;
        deadline: Date;
    };
    metadata?: Record<string, any> | undefined;
}>, z.ZodObject<{
    id: z.ZodString;
    streamId: z.ZodString;
    timestamp: z.ZodDate;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
} & {
    type: z.ZodLiteral<"TICKET_COMPLETED">;
    payload: z.ZodObject<{
        ticketId: z.ZodString;
        title: z.ZodString;
        bondReturned: z.ZodNumber;
        verifiedBy: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        ticketId: string;
        title: string;
        bondReturned: number;
        verifiedBy: string;
    }, {
        ticketId: string;
        title: string;
        bondReturned: number;
        verifiedBy: string;
    }>;
}, "strip", z.ZodTypeAny, {
    timestamp: Date;
    type: "TICKET_COMPLETED";
    id: string;
    streamId: string;
    payload: {
        ticketId: string;
        title: string;
        bondReturned: number;
        verifiedBy: string;
    };
    metadata?: Record<string, any> | undefined;
}, {
    timestamp: Date;
    type: "TICKET_COMPLETED";
    id: string;
    streamId: string;
    payload: {
        ticketId: string;
        title: string;
        bondReturned: number;
        verifiedBy: string;
    };
    metadata?: Record<string, any> | undefined;
}>, z.ZodObject<{
    id: z.ZodString;
    streamId: z.ZodString;
    timestamp: z.ZodDate;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
} & {
    type: z.ZodLiteral<"FORFEITURE_EXECUTED">;
    payload: z.ZodObject<{
        ticketId: z.ZodString;
        title: z.ZodString;
        originalStake: z.ZodNumber;
        slashed: z.ZodNumber;
        returned: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        ticketId: string;
        title: string;
        originalStake: number;
        slashed: number;
        returned: number;
    }, {
        ticketId: string;
        title: string;
        originalStake: number;
        slashed: number;
        returned: number;
    }>;
}, "strip", z.ZodTypeAny, {
    timestamp: Date;
    type: "FORFEITURE_EXECUTED";
    id: string;
    streamId: string;
    payload: {
        ticketId: string;
        title: string;
        originalStake: number;
        slashed: number;
        returned: number;
    };
    metadata?: Record<string, any> | undefined;
}, {
    timestamp: Date;
    type: "FORFEITURE_EXECUTED";
    id: string;
    streamId: string;
    payload: {
        ticketId: string;
        title: string;
        originalStake: number;
        slashed: number;
        returned: number;
    };
    metadata?: Record<string, any> | undefined;
}>]>;
export type AppEvent = z.infer<typeof AppEventSchema>;
export declare const StakeInputSchema: z.ZodObject<{
    actorId: z.ZodString;
    amount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    amount: number;
    actorId: string;
}, {
    amount: number;
    actorId: string;
}>;
export declare const UnstakeInputSchema: z.ZodObject<{
    actorId: z.ZodString;
    stakeId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    stakeId: string;
    actorId: string;
}, {
    stakeId: string;
    actorId: string;
}>;
export declare const CreateTicketInputSchema: z.ZodObject<{
    workPackageId: z.ZodString;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    bondRequired: z.ZodNumber;
    deadline: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    title: string;
    deadline: Date;
    workPackageId: string;
    bondRequired: number;
    description?: string | undefined;
}, {
    title: string;
    deadline: Date;
    workPackageId: string;
    bondRequired: number;
    description?: string | undefined;
}>;
export declare const ClaimTicketInputSchema: z.ZodObject<{
    actorId: z.ZodString;
    ticketId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    ticketId: string;
    actorId: string;
}, {
    ticketId: string;
    actorId: string;
}>;
export declare const CompleteTicketInputSchema: z.ZodObject<{
    ticketId: z.ZodString;
    verifierId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    verifierId: string;
    ticketId: string;
}, {
    verifierId: string;
    ticketId: string;
}>;
export type StakeInput = z.infer<typeof StakeInputSchema>;
export type UnstakeInput = z.infer<typeof UnstakeInputSchema>;
export type CreateTicketInput = z.infer<typeof CreateTicketInputSchema>;
export type ClaimTicketInput = z.infer<typeof ClaimTicketInputSchema>;
export type CompleteTicketInput = z.infer<typeof CompleteTicketInputSchema>;
export interface ActorState {
    actorId: string;
    currentRep: number;
    stakedRep: number;
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
//# sourceMappingURL=index.d.ts.map