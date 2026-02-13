/**
 * @fated/verifier - Tests
 * Chapter 2: Core Philosophy (Telemetry as Truth)
 * Chapter 3: REP System
 */

// Inline types for testing (avoiding cross-package imports)
type UserId = string;
type VerificationLevel = 'NONE' | 'AUTOMATED' | 'PEER_REVIEW' | 'STAKEHOLDER_APPROVAL';
type ContributionType = 'CODE_COMMIT' | 'CODE_REVIEW' | 'TASK_COMPLETION' | 'DOCUMENTATION' | 'MENTORSHIP';

interface Contribution {
  id: string;
  userId: string;
  type: ContributionType;
  axes: string[];
  verificationLevel: VerificationLevel;
  metadata: Record<string, unknown>;
  createdAt: Date;
}

// ============================================
// VERIFICATION RULES
// ============================================

const VERIFICATION_RULES = {
  NONE: { requires: [], autoApprove: false, decayHours: null },
  AUTOMATED: { requires: ['CI_PASSED', 'LINT_PASSED', 'TESTS_PASSED'], autoApprove: true, decayHours: null },
  PEER_REVIEW: { requires: ['APPROVED_BY', 'CI_PASSED'], autoApprove: false, decayHours: 72 },
  STAKEHOLDER_APPROVAL: { requires: ['PROJECT_LEAD_SIGNOFF', 'PEER_REVIEW', 'CI_PASSED'], autoApprove: false, decayHours: 168 },
} as const;

const TELEMETRY_EVIDENCE = {
  CI_PASSED: 'continuous_integration',
  LINT_PASSED: 'code_quality',
  TESTS_PASSED: 'test_coverage',
  DEPLOY_SUCCESS: 'deployment',
} as const;

interface VerificationDecision {
  contributionId: string;
  level: VerificationLevel;
  approved: boolean;
  evidence: Record<string, boolean>;
  verifierId?: string;
  verifiedAt: Date;
  reason?: string;
}

// ============================================
// VERIFICATION ENGINE
// ============================================

interface TelemetryData {
  ciPassed?: boolean;
  lintPassed?: boolean;
  testsPassed?: boolean;
  deploySuccess?: boolean;
  uptimeMetric?: number;
  responseTime?: number;
  approvedBy?: string[];
  projectLeadSignoff?: boolean;
}

function determineVerificationLevel(contribution: Contribution, telemetry: TelemetryData): VerificationDecision {
  const evidence: Record<string, boolean> = {};
  
  evidence[TELEMETRY_EVIDENCE.CI_PASSED] = telemetry.ciPassed ?? false;
  evidence[TELEMETRY_EVIDENCE.LINT_PASSED] = telemetry.lintPassed ?? false;
  evidence[TELEMETRY_EVIDENCE.TESTS_PASSED] = telemetry.testsPassed ?? false;
  evidence[TELEMETRY_EVIDENCE.DEPLOY_SUCCESS] = telemetry.deploySuccess ?? false;

  let level: VerificationLevel = 'NONE';
  let approved = false;
  let reason = 'No verification evidence available';

  if (telemetry.ciPassed && telemetry.testsPassed) {
    level = 'AUTOMATED';
    approved = true;
    reason = 'Automated CI/CD verification passed';
  }

  if (approved && telemetry.approvedBy && telemetry.approvedBy.length > 0) {
    level = 'PEER_REVIEW';
    reason = `Approved by ${telemetry.approvedBy.length} peer(s)`;
  }

  if (level === 'PEER_REVIEW' && telemetry.projectLeadSignoff) {
    level = 'STAKEHOLDER_APPROVAL';
    reason = 'Stakeholder sign-off received';
  }

  return {
    contributionId: contribution.id,
    level,
    approved,
    evidence,
    verifiedAt: new Date(),
    reason,
  };
}

function calculateVerificationDecay(decision: VerificationDecision): { shouldDecay: boolean; newLevel: VerificationLevel } {
  const rule = VERIFICATION_RULES[decision.level];
  
  if (!rule.decayHours) {
    return { shouldDecay: false, newLevel: decision.level };
  }

  const hoursSinceVerification = (Date.now() - decision.verifiedAt.getTime()) / (1000 * 60 * 60);

  if (hoursSinceVerification > rule.decayHours) {
    const levels: VerificationLevel[] = ['STAKEHOLDER_APPROVAL', 'PEER_REVIEW', 'AUTOMATED', 'NONE'];
    const currentIndex = levels.indexOf(decision.level);
    
    if (currentIndex < levels.length - 1) {
      return { shouldDecay: true, newLevel: levels[currentIndex + 1] };
    }
  }

  return { shouldDecay: false, newLevel: decision.level };
}

function verifyContribution(contribution: Contribution, telemetry: TelemetryData, manualVerifierId?: UserId): VerificationDecision {
  const decision = determineVerificationLevel(contribution, telemetry);
  if (manualVerifierId) {
    decision.verifierId = manualVerifierId;
  }
  return decision;
}

function calculateExecutionReliability(verificationHistory: VerificationDecision[]): number {
  if (verificationHistory.length === 0) {
    return 0;
  }

  const approved = verificationHistory.filter(v => v.approved).length;
  const approvalRate = approved / verificationHistory.length;

  let reliability = approvalRate * 50;

  const levelScores: Record<string, number> = {
    NONE: 0,
    AUTOMATED: 15,
    PEER_REVIEW: 30,
    STAKEHOLDER_APPROVAL: 50,
  };

  const avgLevelScore = verificationHistory.reduce((sum, v) => sum + levelScores[v.level], 0) / verificationHistory.length;

  reliability += avgLevelScore;

  return Math.min(100, Math.round(reliability));
}

// ============================================
// TESTS
// ============================================

describe('Verification Engine', () => {
  const mockContribution: Contribution = {
    id: 'contrib-123',
    userId: 'user-123',
    type: 'CODE_COMMIT',
    axes: ['BACKEND'],
    verificationLevel: 'NONE',
    metadata: {},
    createdAt: new Date(),
  };

  describe('determineVerificationLevel', () => {
    it('should return NONE when no telemetry', () => {
      const result = determineVerificationLevel(mockContribution, {});
      
      expect(result.level).toBe('NONE');
      expect(result.approved).toBe(false);
    });

    it('should return AUTOMATED when CI and tests pass', () => {
      const telemetry = { ciPassed: true, testsPassed: true };
      const result = determineVerificationLevel(mockContribution, telemetry);
      
      expect(result.level).toBe('AUTOMATED');
      expect(result.approved).toBe(true);
    });

    it('should return PEER_REVIEW when approved by peers', () => {
      const telemetry = { ciPassed: true, testsPassed: true, approvedBy: ['user-1', 'user-2'] };
      const result = determineVerificationLevel(mockContribution, telemetry);
      
      expect(result.level).toBe('PEER_REVIEW');
      expect(result.approved).toBe(true);
    });

    it('should return STAKEHOLDER_APPROVAL with lead signoff', () => {
      const telemetry = { ciPassed: true, testsPassed: true, approvedBy: ['user-1'], projectLeadSignoff: true };
      const result = determineVerificationLevel(mockContribution, telemetry);
      
      expect(result.level).toBe('STAKEHOLDER_APPROVAL');
    });
  });

  describe('calculateVerificationDecay', () => {
    it('should not decay levels without decay time', () => {
      const decision: VerificationDecision = {
        contributionId: 'contrib-123',
        level: 'AUTOMATED',
        approved: true,
        evidence: {},
        verifiedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
        reason: 'Test',
      };
      
      const result = calculateVerificationDecay(decision);
      expect(result.shouldDecay).toBe(false);
    });

    it('should decay PEER_REVIEW after 72 hours', () => {
      const decision: VerificationDecision = {
        contributionId: 'contrib-123',
        level: 'PEER_REVIEW',
        approved: true,
        evidence: {},
        verifiedAt: new Date(Date.now() - 1000 * 60 * 60 * 80),
        reason: 'Test',
      };
      
      const result = calculateVerificationDecay(decision);
      expect(result.shouldDecay).toBe(true);
      expect(result.newLevel).toBe('AUTOMATED');
    });
  });

  describe('verifyContribution', () => {
    it('should add manual verifier when provided', () => {
      const telemetry = { ciPassed: true, testsPassed: true };
      const result = verifyContribution(mockContribution, telemetry, 'verifier-123');
      
      expect(result.verifierId).toBe('verifier-123');
    });
  });
});

describe('Execution Reliability Calculation', () => {
  describe('calculateExecutionReliability', () => {
    it('should return 0 for empty history', () => {
      const result = calculateExecutionReliability([]);
      expect(result).toBe(0);
    });

    it('should calculate from approval rate', () => {
      const decisions: VerificationDecision[] = [
        { contributionId: 'c-1', level: 'AUTOMATED', approved: true, evidence: {}, verifiedAt: new Date(), reason: 'test' },
        { contributionId: 'c-2', level: 'AUTOMATED', approved: true, evidence: {}, verifiedAt: new Date(), reason: 'test' },
        { contributionId: 'c-3', level: 'AUTOMATED', approved: false, evidence: {}, verifiedAt: new Date(), reason: 'test' },
      ];
      
      const result = calculateExecutionReliability(decisions);
      // 66% approval * 50 = 33 + 15 (AUTOMATED avg) = 48
      expect(result).toBe(48);
    });

    it('should reward higher verification levels', () => {
      const decisions: VerificationDecision[] = [
        { contributionId: 'c-1', level: 'STAKEHOLDER_APPROVAL', approved: true, evidence: {}, verifiedAt: new Date(), reason: 'test' },
      ];
      
      const result = calculateExecutionReliability(decisions);
      // 100% approval * 50 = 50 + 50 (STAKEHOLDER) = 100
      expect(result).toBe(100);
    });
  });
});
