/**
 * @fated/domain-xp
 * XP Calculation and Decay Logic
 */

import { z } from 'zod';
import type { Specialty, ContributionSubmitted, VerificationSubmitted } from '@fated/core';

// ============================================
// CONFIGURATION
// ============================================

const XP_CONFIG = {
  BASE_CONTRIBUTION_XP: 100,
  VERIFICATION_XP: 25,
  COMPLEXITY_MULTIPLIER: {
    1: 0.5,
    2: 0.75,
    3: 1.0,
    4: 1.25,
    5: 1.5,
    6: 1.75,
    7: 2.0,
    8: 2.5,
    9: 3.0,
    10: 4.0,
  },
  SPECIALTY_BONUS: {
    BACKEND: 1.2,
    FRONTEND: 1.2,
    DEVOPS: 1.3,
    SECURITY: 1.5,
    RESEARCH: 1.4,
  },
  DECAY_HALF_LIFE_DAYS: 30,
  DECAY_RATE: 0.02, // 2% per day
};

// ============================================
// XP CALCULATIONS
// ============================================

/**
 * Calculate XP earned from a contribution
 */
export function calculateContributionXP(
  contribution: ContributionSubmitted['payload'],
  verdict: 'APPROVE' | 'REJECT' = 'APPROVE'
): number {
  if (verdict === 'REJECT') return 0;

  const complexityMult = XP_CONFIG.COMPLEXITY_MULTIPLIER[contribution.complexityScore ?? 3];
  const specialtyBonus = XP_CONFIG.SPECIALTY_BONUS[contribution.specialty ?? 'BACKEND'];

  const baseXP = XP_CONFIG.BASE_CONTRIBUTION_XP;
  return Math.floor(baseXP * complexityMult * specialtyBonus);
}

/**
 * Calculate XP earned from verification
 */
export function calculateVerificationXP(
  verification: VerificationSubmitted['payload']
): number {
  const baseXP = XP_CONFIG.VERIFICATION_XP;
  const specialtyBonus = XP_CONFIG.SPECIALTY_BONUS[verification.specialty ?? 'BACKEND'];
  
  // Quality score adds up to 50% bonus
  const qualityBonus = 1 + ((verification.qualityScore ?? 3) / 10);
  
  return Math.floor(baseXP * qualityBonus * specialtyBonus);
}

/**
 * Apply decay to XP based on time since last activity
 */
export function applyDecay(currentXP: number, daysSinceLastActivity: number): number {
  if (daysSinceLastActivity <= 0) return currentXP;
  
  // Exponential decay: XP * (1 - rate)^days
  const decayedXP = currentXP * Math.pow(1 - XP_CONFIG.DECAY_RATE, daysSinceLastActivity);
  return Math.floor(decayedXP);
}

/**
 * Calculate decay rate for an actor
 */
export function calculateDecayRate(totalXP: number): number {
  // Higher XP = faster decay (proportional)
  return XP_CONFIG.DECAY_RATE * (1 + totalXP / 1000);
}

// ============================================
// INPUT VALIDATION
// ============================================

export const CalculateXPInputSchema = z.object({
  complexityScore: z.number().min(1).max(10).optional(),
  specialty: z.enum(['BACKEND', 'FRONTEND', 'DEVOPS', 'SECURITY', 'RESEARCH']).optional(),
  qualityScore: z.number().min(1).max(5).optional(),
  verdict: z.enum(['APPROVE', 'REJECT']).optional(),
});

export type CalculateXPInput = z.infer<typeof CalculateXPInputSchema>;

// ============================================
// MAIN CALCULATOR
// ============================================

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
export function calculateXP(input: CalculateXPInput): XPCalculationResult {
  const { complexityScore, specialty, qualityScore, verdict } = CalculateXPInputSchema.parse(input);

  if (verdict === 'REJECT') {
    return { xp: 0, breakdown: { baseXP: 0, complexityMultiplier: 1, specialtyBonus: 1 } };
  }

  const complexityMult = XP_CONFIG.COMPLEXITY_MULTIPLIER[complexityScore ?? 3];
  const specialtyBonus = XP_CONFIG.SPECIALTY_BONUS[specialty ?? 'BACKEND'];
  
  const baseXP = XP_CONFIG.BASE_CONTRIBUTION_XP;
  const qualityBonus = qualityScore ? 1 + (qualityScore / 10) : 1;

  const totalXP = Math.floor(baseXP * complexityMult * specialtyBonus * qualityBonus);

  return {
    xp: totalXP,
    breakdown: {
      baseXP,
      complexityMultiplier: complexityMult,
      specialtyBonus,
      qualityBonus: qualityScore ? qualityBonus : undefined,
    },
  };
}

/**
 * Get configuration (useful for testing)
 */
export function getXPConfig() {
  return { ...XP_CONFIG };
}

export type { Specialty };
