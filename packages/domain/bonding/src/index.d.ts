/**
 * @fated/domain-bonding
 * REP Staking, Tickets, and Forfeiture Logic
 */
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { StakeInputSchema, UnstakeInputSchema, CreateTicketInputSchema, ClaimTicketInputSchema, CompleteTicketInputSchema } from '@fated/core';
declare function getPrisma(): PrismaClient<import("@prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
/**
 * Place a stake - locks REP from user's liquid balance
 */
export declare function stakeRep(input: z.infer<typeof StakeInputSchema>): Promise<{
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
export declare function releaseStake(input: z.infer<typeof UnstakeInputSchema>): Promise<{
    success: boolean;
    stakeId: string;
}>;
/**
 * Create a new ticket (work package)
 */
export declare function createTicket(input: z.infer<typeof CreateTicketInputSchema>): Promise<{
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
export declare function claimTicket(input: z.infer<typeof ClaimTicketInputSchema>): Promise<{
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
    autoStaked: boolean;
}>;
/**
 * Complete a ticket - returns stake + awards REP
 */
export declare function completeTicket(input: z.infer<typeof CompleteTicketInputSchema>): Promise<{
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
 */
export declare function processForfeitures(slashPercent?: number): Promise<{
    ticketId: string;
    slashed: number;
    returned: number;
}[]>;
export declare function getStakeSummary(actorId: string): Promise<{
    currentRep: number;
    stakedRep: number;
    activeStakes: number;
    activeTickets: number;
}>;
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
export declare function getActorState(actorId: string): Promise<{
    roleHistory: string;
    lastActivity: Date | null;
    actorId: string;
    currentRep: number;
    stakedRep: number;
    currentXp: number;
    pendingXp: number;
    contributions: number;
    decayRate: number;
    lastUpdated: Date;
    successRate: string;
} | null>;
export declare function listStakes(actorId: string, status?: string): Promise<{
    id: string;
    status: string;
    amount: number;
    ticketId: string | null;
    actorId: string;
    createdAt: Date;
    releasedAt: Date | null;
}[]>;
export { getPrisma };
export type { Stake, Ticket, ActorState } from '@fated/core';
//# sourceMappingURL=index.d.ts.map