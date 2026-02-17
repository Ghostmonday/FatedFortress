/**
 * @fated/domain-matching
 * Team Formation and Matching Logic
 */
import { z } from 'zod';
import type { Specialty } from '@fated/core';
export interface Member {
    userId: string;
    specialty: Specialty;
    xp: number;
    successRate: number;
    role?: 'LEADER' | 'CONTRIBUTOR' | 'REVIEWER';
}
export interface Team {
    id: string;
    members: Member[];
    totalPower: number;
    specialtyCoverage: Record<Specialty, number>;
}
/**
 * Calculate individual member's power score
 */
export declare function calculateMemberPower(member: Member): number;
/**
 * Calculate team's total power
 */
export declare function calculateTeamPower(members: Member[]): number;
/**
 * Calculate specialty coverage score
 */
export declare function calculateSpecialtyCoverage(members: Member[]): Record<Specialty, number>;
/**
 * Check if a team is balanced (has required specialties)
 */
export declare function isTeamBalanced(members: Member[], requiredSpecialties?: Specialty[]): boolean;
/**
 * Form optimal teams from a pool of members
 */
export declare function formTeams(members: Member[], targetTeamSize?: number): Team[];
/**
 * Find best member to assign as team leader
 */
export declare function findLeader(members: Member[]): Member | null;
/**
 * Assign roles to team members optimally
 */
export declare function assignRoles(members: Member[]): Member[];
export declare const MemberInputSchema: z.ZodObject<{
    userId: z.ZodString;
    specialty: z.ZodEnum<["BACKEND", "FRONTEND", "DEVOPS", "SECURITY", "RESEARCH"]>;
    xp: z.ZodNumber;
    successRate: z.ZodNumber;
    role: z.ZodOptional<z.ZodEnum<["LEADER", "CONTRIBUTOR", "REVIEWER"]>>;
}, "strip", z.ZodTypeAny, {
    xp: number;
    userId: string;
    specialty: "BACKEND" | "FRONTEND" | "DEVOPS" | "SECURITY" | "RESEARCH";
    successRate: number;
    role?: "REVIEWER" | "LEADER" | "CONTRIBUTOR" | undefined;
}, {
    xp: number;
    userId: string;
    specialty: "BACKEND" | "FRONTEND" | "DEVOPS" | "SECURITY" | "RESEARCH";
    successRate: number;
    role?: "REVIEWER" | "LEADER" | "CONTRIBUTOR" | undefined;
}>;
export type MemberInput = z.infer<typeof MemberInputSchema>;
/**
 * Form a party (team) from member pool
 */
export declare function formParty(members: MemberInput[]): Team;
/**
 * Get configuration (useful for testing)
 */
export declare function getMatchingConfig(): {
    IDEAL_TEAM_SIZE: number;
    MIN_TEAM_SIZE: number;
    MAX_TEAM_SIZE: number;
    SPECIALTY_WEIGHTS: {
        BACKEND: number;
        FRONTEND: number;
        DEVOPS: number;
        SECURITY: number;
        RESEARCH: number;
    };
    ROLE_SCORES: {
        LEADER: number;
        CONTRIBUTOR: number;
        REVIEWER: number;
    };
};
export type { Specialty };
//# sourceMappingURL=index.d.ts.map