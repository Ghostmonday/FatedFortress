/**
 * @fated/domain-matching
 * Team Formation and Matching Logic
 */

import { z } from 'zod';
import type { Specialty } from '@fated/core';

// ============================================
// CONFIGURATION
// ============================================

const MATCHING_CONFIG = {
  IDEAL_TEAM_SIZE: 4,
  MIN_TEAM_SIZE: 2,
  MAX_TEAM_SIZE: 6,
  SPECIALTY_WEIGHTS: {
    BACKEND: 1.0,
    FRONTEND: 1.0,
    DEVOPS: 1.5,
    SECURITY: 2.0,
    RESEARCH: 1.5,
  },
  ROLE_SCORES: {
    LEADER: 1.5,
    CONTRIBUTOR: 1.0,
    REVIEWER: 1.2,
  },
};

// ============================================
// TYPES
// ============================================

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

// ============================================
// SCORING
// ============================================

/**
 * Calculate individual member's power score
 */
export function calculateMemberPower(member: Member): number {
  const specialtyWeight = MATCHING_CONFIG.SPECIALTY_WEIGHTS[member.specialty];
  const roleScore = MATCHING_CONFIG.ROLE_SCORES[member.role ?? 'CONTRIBUTOR'];
  
  return member.xp * member.successRate * specialtyWeight * roleScore;
}

/**
 * Calculate team's total power
 */
export function calculateTeamPower(members: Member[]): number {
  return members.reduce((sum, m) => sum + calculateMemberPower(m), 0);
}

/**
 * Calculate specialty coverage score
 */
export function calculateSpecialtyCoverage(members: Member[]): Record<Specialty, number> {
  const coverage: Record<Specialty, number> = {
    BACKEND: 0,
    FRONTEND: 0,
    DEVOPS: 0,
    SECURITY: 0,
    RESEARCH: 0,
  };
  
  for (const member of members) {
    coverage[member.specialty]++;
  }
  
  return coverage;
}

// ============================================
// TEAM FORMATION
// ============================================

/**
 * Check if a team is balanced (has required specialties)
 */
export function isTeamBalanced(members: Member[], requiredSpecialties: Specialty[] = []): boolean {
  const coverage = calculateSpecialtyCoverage(members);
  
  // Must have at least one of each required specialty
  for (const specialty of requiredSpecialties) {
    if (coverage[specialty] < 1) return false;
  }
  
  // Team size should be appropriate
  if (members.length < MATCHING_CONFIG.MIN_TEAM_SIZE) return false;
  if (members.length > MATCHING_CONFIG.MAX_TEAM_SIZE) return false;
  
  return true;
}

/**
 * Form optimal teams from a pool of members
 */
export function formTeams(members: Member[], targetTeamSize: number = MATCHING_CONFIG.IDEAL_TEAM_SIZE): Team[] {
  if (members.length === 0) return [];
  
  // Sort by power (descending) for greedy team formation
  const sorted = [...members].sort((a, b) => calculateMemberPower(b) - calculateMemberPower(a));
  
  const teams: Team[] = [];
  
  while (sorted.length >= MATCHING_CONFIG.MIN_TEAM_SIZE) {
    const teamMembers: Member[] = [];
    
    // Take up to targetTeamSize members
    const takeCount = Math.min(targetTeamSize, sorted.length);
    
    for (let i = 0; i < takeCount && sorted.length > 0; i++) {
      teamMembers.push(sorted.shift()!);
    }
    
    teams.push({
      id: crypto.randomUUID(),
      members: teamMembers,
      totalPower: calculateTeamPower(teamMembers),
      specialtyCoverage: calculateSpecialtyCoverage(teamMembers),
    });
  }
  
  // Leftovers form a smaller team if possible
  if (sorted.length >= MATCHING_CONFIG.MIN_TEAM_SIZE) {
    teams.push({
      id: crypto.randomUUID(),
      members: sorted.splice(0),
      totalPower: calculateTeamPower(sorted),
      specialtyCoverage: calculateSpecialtyCoverage(sorted),
    });
  }
  
  return teams;
}

/**
 * Find best member to assign as team leader
 */
export function findLeader(members: Member[]): Member | null {
  if (members.length === 0) return null;
  
  // Leader should have highest power and good success rate
  return members.reduce((best, current) => {
    const bestPower = calculateMemberPower(best);
    const currentPower = calculateMemberPower(current);
    
    // Prefer higher success rate when powers are similar
    if (currentPower > bestPower || 
        (currentPower === bestPower && current.successRate > best.successRate)) {
      return current;
    }
    return best;
  });
}

/**
 * Assign roles to team members optimally
 */
export function assignRoles(members: Member[]): Member[] {
  if (members.length === 0) return [];
  
  const withRoles = [...members];
  
  // First member is leader
  withRoles[0].role = 'LEADER';
  
  // Rest are contributors or reviewers based on success rate
  for (let i = 1; i < withRoles.length; i++) {
    withRoles[i].role = withRoles[i].successRate > 0.8 ? 'REVIEWER' : 'CONTRIBUTOR';
  }
  
  return withRoles;
}

// ============================================
// INPUT VALIDATION
// ============================================

export const MemberInputSchema = z.object({
  userId: z.string(),
  specialty: z.enum(['BACKEND', 'FRONTEND', 'DEVOPS', 'SECURITY', 'RESEARCH']),
  xp: z.number().min(0),
  successRate: z.number().min(0).max(1),
  role: z.enum(['LEADER', 'CONTRIBUTOR', 'REVIEWER']).optional(),
});

export type MemberInput = z.infer<typeof MemberInputSchema>;

// ============================================
// MAIN EXPORTS
// ============================================

/**
 * Form a party (team) from member pool
 */
export function formParty(members: MemberInput[]): Team {
  const parsed = members.map(m => MemberInputSchema.parse(m));
  const withRoles = assignRoles(parsed);
  
  return {
    id: crypto.randomUUID(),
    members: withRoles,
    totalPower: calculateTeamPower(withRoles),
    specialtyCoverage: calculateSpecialtyCoverage(withRoles),
  };
}

/**
 * Get configuration (useful for testing)
 */
export function getMatchingConfig() {
  return { ...MATCHING_CONFIG };
}

export type { Specialty };
