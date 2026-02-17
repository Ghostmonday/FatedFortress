import { SystemState } from '@fated/xp-logic';
import { Specialty, UserId } from '@fated/types';
export type PartyRole = 'ARCHITECT' | 'GUARDIAN' | 'BUILDER';
export type PartyMember = {
    userId: UserId;
    role: PartyRole;
    score: number;
};
export type AdventuringParty = {
    members: PartyMember[];
    totalPower: number;
};
export declare const formParty: (state: SystemState, now?: Date, targetDomain?: Specialty) => AdventuringParty;
//# sourceMappingURL=index.d.ts.map