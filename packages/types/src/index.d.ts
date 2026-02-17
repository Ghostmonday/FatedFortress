export type Brand<K, T> = K & {
    __brand: T;
};
export type UserId = Brand<string, "UserId">;
export type ProjectId = Brand<string, "ProjectId">;
export type ContributionId = Brand<string, "ContributionId">;
export declare const toUserId: (id: string) => UserId;
export declare const toProjectId: (id: string) => ProjectId;
export declare const toContributionId: (id: string) => ContributionId;
export declare enum Visibility {
    OFF = "OFF",
    ANON = "ANON"
}
export type Specialty = 'BACKEND' | 'FRONTEND' | 'DEVOPS' | 'SECURITY' | 'RESEARCH';
//# sourceMappingURL=index.d.ts.map