/**
 * @fated/domain-xp
 * XP Calculation and Decay Logic
 */
import { z } from 'zod';
import type { Specialty, ContributionSubmitted, VerificationSubmitted } from '@fated/core';
/**
 * Calculate XP earned from a contribution
 */
export declare function calculateContributionXP(contribution: ContributionSubmitted['payload'], verdict?: 'APPROVE' | 'REJECT'): number;
/**
 * Calculate XP earned from verification
 */
export declare function calculateVerificationXP(verification: VerificationSubmitted['payload']): number;
/**
 * Apply decay to XP based on time since last activity
 */
export declare function applyDecay(currentXP: number, daysSinceLastActivity: number): number;
/**
 * Calculate decay rate for an actor
 */
export declare function calculateDecayRate(totalXP: number): number;
export declare const CalculateXPInputSchema: z.ZodObject<{
    complexityScore: z.ZodOptional<z.ZodNumber>;
    specialty: z.ZodOptional<z.ZodEnum<["BACKEND", "FRONTEND", "DEVOPS", "SECURITY", "RESEARCH"]>>;
    qualityScore: z.ZodOptional<z.ZodNumber>;
    verdict: z.ZodOptional<z.ZodEnum<["APPROVE", "REJECT"]>>;
}, "strip", z.ZodTypeAny, {
    complexityScore?: number | undefined;
    specialty?: "BACKEND" | "FRONTEND" | "DEVOPS" | "SECURITY" | "RESEARCH" | undefined;
    verdict?: "APPROVE" | "REJECT" | undefined;
    qualityScore?: number | undefined;
}, {
    complexityScore?: number | undefined;
    specialty?: "BACKEND" | "FRONTEND" | "DEVOPS" | "SECURITY" | "RESEARCH" | undefined;
    verdict?: "APPROVE" | "REJECT" | undefined;
    qualityScore?: number | undefined;
}>;
export type CalculateXPInput = z.infer<typeof CalculateXPInputSchema>;
export interface XPCalculationResult {
    xp: number;
    breakdown: {
        baseXP: number;
        complexityMultiplier: number;
        specialtyBonus: number;
        qualityBonus?: number;
    };
}
/**
 * Calculate XP from contribution or verification
 */
export declare function calculateXP(input: CalculateXPInput): XPCalculationResult;
/**
 * Get configuration (useful for testing)
 */
export declare function getXPConfig(): {
    BASE_CONTRIBUTION_XP: number;
    VERIFICATION_XP: number;
    COMPLEXITY_MULTIPLIER: Record<number, number>;
    SPECIALTY_BONUS: {
        BACKEND: number;
        FRONTEND: number;
        DEVOPS: number;
        SECURITY: number;
        RESEARCH: number;
    };
    DECAY_HALF_LIFE_DAYS: number;
    DECAY_RATE: number;
};
export type { Specialty };
//# sourceMappingURL=index.d.ts.map