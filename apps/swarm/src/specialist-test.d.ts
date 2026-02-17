import { XpVector } from '@fated/xp-logic';
interface TestUser {
    userId: string;
    name: string;
    xpVector: XpVector;
}
declare const createGeneralist: () => TestUser;
declare const createSpecialist: () => TestUser;
declare const runSpecialistTest: () => boolean;
export { runSpecialistTest, createGeneralist, createSpecialist };
//# sourceMappingURL=specialist-test.d.ts.map