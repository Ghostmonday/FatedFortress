import { AppEvent } from '@fated/events';
import { UserId } from '@fated/types';
export type XpVector = {
    totalXP: number;
    pendingXP: number;
    execution: number;
    collaboration: number;
    judgment: number;
    roleHistory: Record<string, Record<string, number>>;
    successRate: Record<string, number>;
    lastActivity: Date | null;
};
export type SystemState = Record<UserId, XpVector>;
export declare const calculateState: (events: AppEvent[], now?: Date) => SystemState;
//# sourceMappingURL=index.d.ts.map