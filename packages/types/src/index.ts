// Branded types to prevent mixing up IDs
export type Brand<K, T> = K & { __brand: T };

export type UserId = Brand<string, "UserId">;
export type ProjectId = Brand<string, "ProjectId">;
export type ContributionId = Brand<string, "ContributionId">;

// Factories to avoid ugly casting everywhere
export const toUserId = (id: string) => id as UserId;
export const toProjectId = (id: string) => id as ProjectId;
export const toContributionId = (id: string) => id as ContributionId;

export enum Visibility {
  OFF = "OFF",
  ANON = "ANON"
}
