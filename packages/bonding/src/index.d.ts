import { z } from 'zod';
export declare const StakeSchema: z.ZodObject<{
    actorId: z.ZodString;
    amount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    amount: number;
    actorId: string;
}, {
    amount: number;
    actorId: string;
}>;
export declare const UnstakeSchema: z.ZodObject<{
    actorId: z.ZodString;
    stakeId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    stakeId: string;
    actorId: string;
}, {
    stakeId: string;
    actorId: string;
}>;
export declare const CreateTicketSchema: z.ZodObject<{
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
export declare const ClaimTicketSchema: z.ZodObject<{
    actorId: z.ZodString;
    ticketId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    ticketId: string;
    actorId: string;
}, {
    ticketId: string;
    actorId: string;
}>;
export declare const CompleteTicketSchema: z.ZodObject<{
    ticketId: z.ZodString;
    verifierId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    verifierId: string;
    ticketId: string;
}, {
    verifierId: string;
    ticketId: string;
}>;
/**
 * Place a stake - locks REP from user's liquid balance
 */
export declare function stakeRep(input: z.infer<typeof StakeSchema>): Promise<{
    id: string;
    status: string;
    amount: number;
    ticketId: string | null;
    actorId: string;
    createdAt: Date;
    releasedAt: Date | null;
}>;
/**
 * Release a stake - returns REP to liquid balance
 * Only allows releasing stakes not tied to active tickets
 */
export declare function releaseStake(input: z.infer<typeof UnstakeSchema>): Promise<{
    success: boolean;
    stakeId: string;
}>;
/**
 * Create a new ticket (work package)
 */
export declare function createTicket(input: z.infer<typeof CreateTicketSchema>): Promise<{
    id: string;
    status: string;
    title: string;
    deadline: Date;
    workPackageId: string;
    description: string | null;
    bondRequired: number;
    claimedAt: Date | null;
    completedAt: Date | null;
    claimedBy: string | null;
}>;
/**
 * Claim a ticket - auto-stakes from current REP if needed
 */
export declare function claimTicket(input: z.infer<typeof ClaimTicketSchema>): Promise<{
    ticket: {
        id: string;
        status: string;
        title: string;
        deadline: Date;
        workPackageId: string;
        description: string | null;
        bondRequired: number;
        claimedAt: Date | null;
        completedAt: Date | null;
        claimedBy: string | null;
    };
    stake: {
        id: string;
        status: string;
        amount: number;
        ticketId: string | null;
        actorId: string;
        createdAt: Date;
        releasedAt: Date | null;
    };
}>;
/**
 * Complete a ticket - returns stake + awards REP
 */
export declare function completeTicket(input: z.infer<typeof CompleteTicketSchema>): Promise<{
    ticket: {
        id: string;
        status: string;
        title: string;
        deadline: Date;
        workPackageId: string;
        description: string | null;
        bondRequired: number;
        claimedAt: Date | null;
        completedAt: Date | null;
        claimedBy: string | null;
    };
    returnedAmount: number;
}>;
/**
 * Process overdue tickets - slash staked REP
 * Implements batching, time budget, and fair ordering
 * @param slashPercent - percentage of stake to burn (0-1)
 * @param batchSize - max tickets per batch (default 50)
 * @param timeBudgetMs - max time per cycle in ms (default 5000)
 */
export declare function processForfeitures(slashPercent?: number, batchSize?: number, timeBudgetMs?: number): Promise<{
    results: any[];
    errors: {
        ticketId: string;
        error: string;
    }[];
    totalProcessed: number;
    totalFailed: number;
}>;
/**
 * Get user's staking summary
 */
export declare function getStakeSummary(actorId: string): Promise<{
    currentRep: number;
    stakedRep: number;
    activeStakes: number;
    activeTickets: number;
}>;
/**
 * List available tickets
 */
export declare function listOpenTickets(limit?: number): Promise<{
    id: string;
    status: string;
    title: string;
    deadline: Date;
    workPackageId: string;
    description: string | null;
    bondRequired: number;
    claimedAt: Date | null;
    completedAt: Date | null;
    claimedBy: string | null;
}[]>;
/**
 * Get ticket details
 */
export declare function getTicket(ticketId: string): Promise<({
    stake: {
        id: string;
        status: string;
        amount: number;
        ticketId: string | null;
        actorId: string;
        createdAt: Date;
        releasedAt: Date | null;
    } | null;
} & {
    id: string;
    status: string;
    title: string;
    deadline: Date;
    workPackageId: string;
    description: string | null;
    bondRequired: number;
    claimedAt: Date | null;
    completedAt: Date | null;
    claimedBy: string | null;
}) | null>;
export { prisma };
//# sourceMappingURL=index.d.ts.map