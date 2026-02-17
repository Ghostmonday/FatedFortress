import { ContributionSubmitted, VerificationSubmitted } from '@fated/events';
import { UserId, Specialty } from '@fated/types';
export declare class Agent {
    readonly id: UserId;
    readonly name: string;
    readonly role: 'BUILDER' | 'REVIEWER';
    readonly specialty: Specialty;
    constructor(specialty?: Specialty);
    act(now: Date): ContributionSubmitted | null;
    verify(targetId: string, now: Date): VerificationSubmitted | null;
}
//# sourceMappingURL=agent.d.ts.map