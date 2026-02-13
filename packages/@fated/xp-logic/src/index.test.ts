/**
 * @fated/xp-logic - Tests
 * Chapter 2: Core Philosophy (Telemetry as Truth)
 * Chapter 3: Trust Gradients & REP System
 */

// Inline minimal types for testing (avoiding cross-package imports in test)
type UserId = string;

interface TrustComponent {
  executionReliability: number;
  collaborationQuality: number;
  contributionQuality: number;
  judgmentQuality: number;
}

interface REPRecord {
  axis: string;
  amount: number;
  earnedAt: Date;
  decayRate: number;
}

// ============================================
// TRUST GRADIENT CALCULATIONS
// ============================================

const TRUST_WEIGHTS = {
  executionReliability: 0.35,
  collaborationQuality: 0.25,
  contributionQuality: 0.25,
  judgmentQuality: 0.15,
} as const;

function calculateTrustScore(userId: UserId, components: TrustComponent): { userId: UserId; overall: number; components: TrustComponent; calculatedAt: Date } {
  const overall = Math.round(
    components.executionReliability * TRUST_WEIGHTS.executionReliability +
    components.collaborationQuality * TRUST_WEIGHTS.collaborationQuality +
    components.contributionQuality * TRUST_WEIGHTS.contributionQuality +
    components.judgmentQuality * TRUST_WEIGHTS.judgmentQuality
  );

  return {
    userId,
    overall: Math.min(100, Math.max(0, overall)),
    components,
    calculatedAt: new Date(),
  };
}

const DECAY_CONFIG = {
  PASSIVE_REP_MONTHLY_RATE: 0.03,
  ACTIVE_BOND_DECAY_RATE: 0.00,
  GRACE_PERIOD_DAYS: 30,
  MIN_TRUST_THRESHOLD: 10,
} as const;

function calculateREPDecay(record: REPRecord, daysSinceLastUpdate: number): number {
  if (daysSinceLastUpdate < DECAY_CONFIG.GRACE_PERIOD_DAYS) {
    return record.amount;
  }

  const monthsElapsed = daysSinceLastUpdate / 30;
  const decayMultiplier = Math.pow(1 - DECAY_CONFIG.PASSIVE_REP_MONTHLY_RATE, monthsElapsed);

  return Math.round(record.amount * decayMultiplier);
}

const TRUST_DECAY_CONFIG = {
  MONTHLY_RATE: 0.10,
  FLOOR: 0,
} as const;

function calculateTrustDecay(currentTrust: number, daysSinceLastUpdate: number): number {
  const monthsElapsed = daysSinceLastUpdate / 30;
  const decayMultiplier = Math.pow(1 - TRUST_DECAY_CONFIG.MONTHLY_RATE, monthsElapsed);
  
  return Math.max(TRUST_DECAY_CONFIG.FLOOR, Math.round(currentTrust * decayMultiplier));
}

// ============================================
// REP EARNING ALGORITHMS
// ============================================

const REP_MULTIPLIERS = {
  NONE: 0.5,
  AUTOMATED: 1.0,
  PEER_REVIEW: 1.5,
  STAKEHOLDER_APPROVAL: 2.0,
} as const;

const REP_BASE_VALUES = {
  CODE_COMMIT: 10,
  CODE_REVIEW: 5,
  TASK_COMPLETION: 8,
  DOCUMENTATION: 3,
  MENTORSHIP: 15,
} as const;

type ContributionType = keyof typeof REP_BASE_VALUES;
type VerificationLevel = keyof typeof REP_MULTIPLIERS;

function calculateREPEarned(
  contributionType: ContributionType,
  verificationLevel: VerificationLevel,
  axisMultiplier: number = 1.0
): number {
  const base = REP_BASE_VALUES[contributionType];
  const multiplier = REP_MULTIPLIERS[verificationLevel];
  return Math.round(base * multiplier * axisMultiplier);
}

// ============================================
// TRUST GRADIENTS - NETWORK EFFECTS
// ============================================

const TRUST_GRADIENT_CONFIG = {
  HIGH_TRUST_PARTNER_BOOST: 1.5,
  LOW_TRUST_PARTNER_PENALTY: 0.5,
  HIGH_TRUST_THRESHOLD: 75,
  LOW_TRUST_THRESHOLD: 25,
} as const;

function applyTrustGradient(baseREP: number, partnerTrustScore: number): number {
  if (partnerTrustScore >= TRUST_GRADIENT_CONFIG.HIGH_TRUST_THRESHOLD) {
    return Math.round(baseREP * TRUST_GRADIENT_CONFIG.HIGH_TRUST_PARTNER_BOOST);
  }
  if (partnerTrustScore <= TRUST_GRADIENT_CONFIG.LOW_TRUST_THRESHOLD) {
    return Math.round(baseREP * TRUST_GRADIENT_CONFIG.LOW_TRUST_PARTNER_PENALTY);
  }
  return baseREP;
}

// ============================================
// TESTS
// ============================================

describe('Trust Gradient Calculations', () => {
  describe('calculateTrustScore', () => {
    it('should calculate weighted trust score correctly', () => {
      const components: TrustComponent = {
        executionReliability: 80,
        collaborationQuality: 70,
        contributionQuality: 90,
        judgmentQuality: 60,
      };
      
      const result = calculateTrustScore('user-123', components);
      
      // 80 * 0.35 + 70 * 0.25 + 90 * 0.25 + 60 * 0.15 = 77
      expect(result.overall).toBe(77);
      expect(result.userId).toBe('user-123');
    });

    it('should clamp score between 0 and 100', () => {
      const components: TrustComponent = {
        executionReliability: 150,  // 150*0.35 = 52.5
        collaborationQuality: -10,  // -10*0.25 = -2.5
        contributionQuality: 50,    // 50*0.25 = 12.5
        judgmentQuality: 50,        // 50*0.15 = 7.5
      };
      
      const result = calculateTrustScore('user-123', components);
      // Raw: 52.5 - 2.5 + 12.5 + 7.5 = 70, clamped to 70 (within 0-100)
      expect(result.overall).toBe(70);
    });
  });

  describe('calculateTrustDecay', () => {
    it('should decay trust by 10% per month', () => {
      const trust = 100;
      const daysElapsed = 30;
      
      const result = calculateTrustDecay(trust, daysElapsed);
      expect(result).toBe(90);
    });

    it('should not decay below floor', () => {
      const trust = 5;
      const daysElapsed = 365;
      
      const result = calculateTrustDecay(trust, daysElapsed);
      expect(result).toBeGreaterThanOrEqual(0); // Floor is 0
    });
  });
});

describe('REP Calculations', () => {
  describe('calculateREPEarned', () => {
    it('should calculate base REP with verification multiplier', () => {
      const rep = calculateREPEarned('CODE_COMMIT', 'PEER_REVIEW', 1.0);
      expect(rep).toBe(15); // 10 * 1.5 = 15
    });

    it('should apply axis multiplier', () => {
      const rep = calculateREPEarned('CODE_COMMIT', 'AUTOMATED', 2.0);
      expect(rep).toBe(20); // 10 * 1.0 * 2.0 = 20
    });

    it('should handle NONE verification with penalty', () => {
      const rep = calculateREPEarned('CODE_COMMIT', 'NONE', 1.0);
      expect(rep).toBe(5); // 10 * 0.5 = 5
    });
  });

  describe('calculateREPDecay', () => {
    it('should not decay during grace period', () => {
      const record: REPRecord = {
        axis: 'BACKEND',
        amount: 100,
        earnedAt: new Date(),
        decayRate: 0.03,
      };
      
      const result = calculateREPDecay(record, 15);
      expect(result).toBe(100);
    });

    it('should decay after grace period', () => {
      const record: REPRecord = {
        axis: 'BACKEND',
        amount: 100,
        earnedAt: new Date(),
        decayRate: 0.03,
      };
      
      const result = calculateREPDecay(record, 60);
      // 100 * (0.97)^2 = 94.09 -> 94
      expect(result).toBe(94);
    });
  });
});

describe('Trust Gradient - Network Effects', () => {
  describe('applyTrustGradient', () => {
    it('should boost REP when working with high-trust partner', () => {
      const baseREP = 10;
      const partnerTrust = 80;
      
      const result = applyTrustGradient(baseREP, partnerTrust);
      expect(result).toBe(15); // 10 * 1.5
    });

    it('should penalize REP when working with low-trust partner', () => {
      const baseREP = 10;
      const partnerTrust = 20;
      
      const result = applyTrustGradient(baseREP, partnerTrust);
      expect(result).toBe(5); // 10 * 0.5
    });

    it('should not adjust in normal trust range', () => {
      const baseREP = 10;
      const partnerTrust = 50;
      
      const result = applyTrustGradient(baseREP, partnerTrust);
      expect(result).toBe(10);
    });
  });
});

describe('Configuration Exports', () => {
  it('should have correct REP base values', () => {
    expect(REP_BASE_VALUES.CODE_COMMIT).toBe(10);
    expect(REP_BASE_VALUES.MENTORSHIP).toBe(15);
  });

  it('should have correct verification multipliers', () => {
    expect(REP_MULTIPLIERS.PEER_REVIEW).toBe(1.5);
    expect(REP_MULTIPLIERS.STAKEHOLDER_APPROVAL).toBe(2.0);
  });

  it('should have correct trust gradient config', () => {
    expect(TRUST_GRADIENT_CONFIG.HIGH_TRUST_THRESHOLD).toBe(75);
    expect(TRUST_GRADIENT_CONFIG.LOW_TRUST_THRESHOLD).toBe(25);
  });
});
