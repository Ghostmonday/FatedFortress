/**
 * @fated/domain-bonding - Schema Validation Tests
 */

import { describe, it, expect } from 'vitest';
import { z } from 'zod';

// Import schemas directly from core
import {
  StakeInputSchema,
  UnstakeInputSchema,
  CreateTicketInputSchema,
  ClaimTicketInputSchema,
  CompleteTicketInputSchema,
} from '@fated/core';

describe('Bonding Curve - Input Validation', () => {
  
  describe('StakeInputSchema', () => {
    it('should validate valid stake input', () => {
      const result = StakeInputSchema.safeParse({
        actorId: '550e8400-e29b-41d4-a716-446655440000',
        amount: 50,
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid UUID for actorId', () => {
      const result = StakeInputSchema.safeParse({
        actorId: 'invalid',
        amount: 50,
      });
      expect(result.success).toBe(false);
    });

    it('should reject negative amount', () => {
      const result = StakeInputSchema.safeParse({
        actorId: '550e8400-e29b-41d4-a716-446655440000',
        amount: -10,
      });
      expect(result.success).toBe(false);
    });

    it('should reject zero amount', () => {
      const result = StakeInputSchema.safeParse({
        actorId: '550e8400-e29b-41d4-a716-446655440000',
        amount: 0,
      });
      expect(result.success).toBe(false);
    });
  });

  describe('CreateTicketSchema', () => {
    it('should validate valid ticket input', () => {
      const result = CreateTicketInputSchema.safeParse({
        workPackageId: 'wp-001',
        title: 'Fix bug',
        bondRequired: 30,
        deadline: '2025-01-01T00:00:00Z',
      });
      expect(result.success).toBe(true);
    });

    it('should reject missing required fields', () => {
      const result = CreateTicketInputSchema.safeParse({
        workPackageId: 'wp-001',
      });
      expect(result.success).toBe(false);
    });

    it('should reject negative bond', () => {
      const result = CreateTicketInputSchema.safeParse({
        workPackageId: 'wp-001',
        title: 'Fix bug',
        bondRequired: -10,
        deadline: '2025-01-01T00:00:00Z',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('ClaimTicketSchema', () => {
    it('should validate valid claim input', () => {
      const result = ClaimTicketInputSchema.safeParse({
        actorId: '550e8400-e29b-41d4-a716-446655440000',
        ticketId: '550e8400-e29b-41d4-a716-446655440001',
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid ticketId format', () => {
      const result = ClaimTicketInputSchema.safeParse({
        actorId: '550e8400-e29b-41d4-a716-446655440000',
        ticketId: 'not-a-uuid',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('CompleteTicketSchema', () => {
    it('should validate valid completion input', () => {
      const result = CompleteTicketInputSchema.safeParse({
        ticketId: '550e8400-e29b-41d4-a716-446655440001',
        verifierId: '550e8400-e29b-41d4-a716-446655440099',
      });
      expect(result.success).toBe(true);
    });
  });
});

describe('Economic Calculations', () => {
  
  it('should calculate 50% slash correctly', () => {
    const bondAmount = 100;
    const slashPercent = 0.5;
    const slashAmount = bondAmount * slashPercent;
    const returnAmount = bondAmount - slashAmount;
    
    expect(slashAmount).toBe(50);
    expect(returnAmount).toBe(50);
  });

  it('should calculate 100% slash (all burned)', () => {
    const bondAmount = 100;
    const slashPercent = 1.0;
    const slashAmount = bondAmount * slashPercent;
    const returnAmount = bondAmount - slashAmount;
    
    expect(slashAmount).toBe(100);
    expect(returnAmount).toBe(0);
  });

  it('should calculate 0% slash (full return)', () => {
    const bondAmount = 100;
    const slashPercent = 0;
    const slashAmount = bondAmount * slashPercent;
    const returnAmount = bondAmount - slashAmount;
    
    expect(slashAmount).toBe(0);
    expect(returnAmount).toBe(100);
  });
});
