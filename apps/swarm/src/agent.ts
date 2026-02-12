import { faker } from '@faker-js/faker';
import { ContributionSubmitted, VerificationSubmitted } from '@fated/events';
import { UserId, toUserId } from '@fated/types';

export class Agent {
    public readonly id: UserId;
    public readonly name: string;
    public readonly role: 'BUILDER' | 'REVIEWER';

    constructor() {
        this.id = toUserId(faker.string.uuid());
        this.name = faker.internet.userName();
        this.role = Math.random() > 0.5 ? 'BUILDER' : 'REVIEWER';
    }

    public act(now: Date): ContributionSubmitted | null {
        if (this.role !== 'BUILDER') return null;
        if (Math.random() > 0.3) return null;

        return {
            id: faker.string.uuid(),
            streamId: this.id,
            timestamp: now,
            type: 'CONTRIBUTION_SUBMITTED',
            payload: {
                userId: this.id,
                url: `https://github.com/expnet/${faker.hacker.noun()}`,
                complexityScore: Math.floor(Math.random() * 10) + 1,
            },
        };
    }

    public verify(targetId: string, now: Date): VerificationSubmitted | null {
        const chance = this.role === 'REVIEWER' ? 0.8 : 0.1;
        if (Math.random() > chance) return null;

        return {
            id: faker.string.uuid(),
            streamId: this.id,
            timestamp: now,
            type: 'VERIFICATION_SUBMITTED',
            payload: {
                verifierId: this.id,
                targetContributionId: targetId,
                verdict: 'APPROVE',
                qualityScore: 5,
            },
        };
    }
}
