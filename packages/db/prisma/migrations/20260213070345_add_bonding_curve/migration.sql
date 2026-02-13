-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "squadIds" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" DATETIME
);

-- CreateTable
CREATE TABLE "Evaluation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "score" REAL NOT NULL,
    "feedback" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Evaluation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Stake" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "actorId" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "ticketId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "releasedAt" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    CONSTRAINT "Stake_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "ActorState" ("actorId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Stake_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "workPackageId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "bondRequired" REAL NOT NULL,
    "claimedBy" TEXT,
    "claimedAt" DATETIME,
    "deadline" DATETIME NOT NULL,
    "completedAt" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    CONSTRAINT "Ticket_claimedBy_fkey" FOREIGN KEY ("claimedBy") REFERENCES "ActorState" ("actorId") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ActorState" (
    "actorId" TEXT NOT NULL PRIMARY KEY,
    "currentRep" REAL NOT NULL DEFAULT 0,
    "stakedRep" REAL NOT NULL DEFAULT 0,
    "currentXp" INTEGER NOT NULL DEFAULT 0,
    "pendingXp" INTEGER NOT NULL DEFAULT 0,
    "contributions" INTEGER NOT NULL DEFAULT 0,
    "decayRate" REAL NOT NULL DEFAULT 0.0,
    "lastActivity" DATETIME,
    "lastUpdated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roleHistory" TEXT NOT NULL DEFAULT '[]',
    "successRate" TEXT NOT NULL DEFAULT '{}'
);
INSERT INTO "new_ActorState" ("actorId", "contributions", "currentXp", "decayRate", "lastActivity", "lastUpdated", "pendingXp", "roleHistory") SELECT "actorId", "contributions", "currentXp", "decayRate", "lastActivity", "lastUpdated", "pendingXp", "roleHistory" FROM "ActorState";
DROP TABLE "ActorState";
ALTER TABLE "new_ActorState" RENAME TO "ActorState";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "Project_status_idx" ON "Project"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Evaluation_projectId_userId_key" ON "Evaluation"("projectId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Stake_ticketId_key" ON "Stake"("ticketId");

-- CreateIndex
CREATE INDEX "Stake_actorId_status_idx" ON "Stake"("actorId", "status");

-- CreateIndex
CREATE INDEX "Ticket_claimedBy_status_idx" ON "Ticket"("claimedBy", "status");

-- CreateIndex
CREATE INDEX "Ticket_status_deadline_idx" ON "Ticket"("status", "deadline");
