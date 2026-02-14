/**
 * @fated/domain-xp - XP Calculation Tests
 */

import { describe, it, expect } from 'vitest';
import { calculateXP, calculateContributionXP, calculateVerificationXP, applyDecay } from './index';

describe('XP Calculations', () => {
  
  describe('calculateContributionXP', () => {
    it('should calculate base XP correctly', () => {
      const xp = calculateContributionXP({
        userId: 'user-1',
        url: 'https://github.com/test/pr/1',
      });
      expect(xp).toBeGreaterThan(0);
    });

    it('should apply complexity multiplier', () => {
      const low = calculateContributionXP({
        userId: 'user-1',
        url: 'https://github.com/test/pr/1',
        complexityScore: 1,
      });
      const high = calculateContributionXP({
        userId: 'user-1',
        url: 'https://github.com/test/pr/1',
        complexityScore: 10,
      });
      expect(high).toBeGreaterThan(low);
    });

    it('should apply specialty bonus', () => {
      const backend = calculateContributionXP({
        userId: 'user-1',
        url: 'https://github.com/test/pr/1',
        specialty: 'BACKEND',
      });
      const security = calculateContributionXP({
        userId: 'user-1',
        url: 'https://github.com/test/pr/1',
        specialty: 'SECURITY',
      });
      expect(security).toBeGreaterThan(backend);
    });

    it('should return 0 for rejected contributions', () => {
      const xp = calculateContributionXP({
        userId: 'user-1',
        url: 'https://github.com/test/pr/1',
      }, 'REJECT');
      expect(xp).toBe(0);
    });
  });

  describe('calculateVerificationXP', () => {
    it('should calculate verification XP', () => {
      const xp = calculateVerificationXP({
        verifierId: 'verifier-1',
        targetContributionId: 'contrib-1',
        verdict: 'APPROVE',
      });
      expect(xp).toBeGreaterThan(0);
    });

    it('should apply quality score bonus', () => {
      const low = calculateVerificationXP({
        verifierId: 'verifier-1',
        targetContributionId: 'contrib-1',
        verdict: 'APPROVE',
        qualityScore: 1,
      });
      const high = calculateVerificationXP({
        verifierId: 'verifier-1',
        targetContributionId: 'contrib-1',
        verdict: 'APPROVE',
        qualityScore: 5,
      });
      expect(high).toBeGreaterThan(low);
    });
  });

  describe('applyDecay', () => {
    it('should not decay recent activity', () => {
      const result = applyDecay(100, 0);
      expect(result).toBe(100);
    });

    it('should decay XP over time', () => {
      const result = applyDecay(100, 30); // 30 days
      expect(result).toBeLessThan(100);
    });

    it('should handle negative days', () => {
      const result = applyDecay(100, -5);
      expect(result).toBe(100);
    });
  });

  describe('calculateXP (main function)', () => {
    it('should return breakdown for approved contribution', () => {
      const result = calculateXP({
        complexityScore: 5,
        specialty: 'BACKEND',
        verdict: 'APPROVE',
      });
      expect(result.xp).toBeGreaterThan(0);
      expect(result.breakdown).toBeDefined();
    });

    it('should return 0 for rejected', () => {
      const result = calculateXP({
        verdict: 'REJECT',
      });
      expect(result.xp).toBe(0);
    });
  });
});
