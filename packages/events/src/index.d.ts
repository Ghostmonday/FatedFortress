import { z } from "zod";
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
export type ContributionSubmitted = z.infer<typeof ContributionSubmittedSchema>;
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
}>]>;
export type AppEvent = z.infer<typeof AppEventSchema>;
//# sourceMappingURL=index.d.ts.map