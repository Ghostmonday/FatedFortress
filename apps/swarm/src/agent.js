import { faker } from '@faker-js/faker';
import { toUserId } from '@fated/types';
export class Agent {
    id;
    name;
    role;
    specialty;
    constructor(specialty) {
        this.id = toUserId(faker.string.uuid());
        this.name = faker.internet.userName();
        this.role = Math.random() > 0.5 ? 'BUILDER' : 'REVIEWER';
        this.specialty = specialty || ['BACKEND', 'FRONTEND', 'DEVOPS', 'SECURITY', 'RESEARCH'][Math.floor(Math.random() * 5)];
    }
    act(now) {
        if (this.role !== 'BUILDER')
            return null;
        if (Math.random() > 0.3)
            return null;
        return {
            id: faker.string.uuid(),
            streamId: this.id,
            timestamp: now,
            type: 'CONTRIBUTION_SUBMITTED',
            payload: {
                userId: this.id,
                url: `https://github.com/expnet/${faker.hacker.noun()}`,
                complexityScore: Math.floor(Math.random() * 10) + 1,
                specialty: this.specialty,
            },
        };
    }
    verify(targetId, now) {
        const chance = this.role === 'REVIEWER' ? 0.8 : 0.1;
        if (Math.random() > chance)
            return null;
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
                specialty: this.specialty,
            },
        };
    }
}
//# sourceMappingURL=agent.js.map