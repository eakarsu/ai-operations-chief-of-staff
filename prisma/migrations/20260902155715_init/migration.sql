-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MANAGER', 'ANALYST');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ANALYST',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "actorId" TEXT,
    "actorName" TEXT,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT,
    "detail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Executive" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "office" TEXT NOT NULL,
    "assistant" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Executive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commitment" (
    "id" TEXT NOT NULL,
    "who" TEXT NOT NULL,
    "what" TEXT NOT NULL,
    "source" TEXT,
    "dueDate" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "noticedAt" TEXT NOT NULL,
    "execId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Commitment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FollowUp" (
    "id" TEXT NOT NULL,
    "commitmentRef" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,
    "draftBody" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3),
    "execId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FollowUp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeetingNote" (
    "id" TEXT NOT NULL,
    "meeting" TEXT NOT NULL,
    "attendees" TEXT NOT NULL,
    "keyDecisions" TEXT NOT NULL,
    "actionItems" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "heldAt" TIMESTAMP(3),
    "execId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MeetingNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeeklyReport" (
    "id" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "highlights" TEXT NOT NULL,
    "risks" TEXT NOT NULL,
    "asks" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3),
    "execId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WeeklyReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DecisionBrief" (
    "id" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "options" TEXT NOT NULL,
    "recommendation" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3),
    "decision" TEXT,
    "execId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DecisionBrief_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DraftCommunication" (
    "id" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "audience" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "approvedBy" TEXT,
    "execId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DraftCommunication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SourceFeed" (
    "id" TEXT NOT NULL,
    "system" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "scopeDetail" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "lastSyncedAt" TIMESTAMP(3),
    "itemsSynced" INTEGER NOT NULL,
    "execId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SourceFeed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActionItem" (
    "id" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "item" TEXT NOT NULL,
    "fromMeeting" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3),
    "notes" TEXT,
    "execId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActionItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EscalationEvent" (
    "id" TEXT NOT NULL,
    "trigger" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "notified" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "raisedAt" TIMESTAMP(3),
    "outcome" TEXT,
    "execId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EscalationEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StakeholderAccount" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "accountabilityArea" TEXT NOT NULL,
    "health" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "lastContact" TIMESTAMP(3),
    "execId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StakeholderAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CalendarWindow" (
    "id" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "attendees" TEXT NOT NULL,
    "startAt" TIMESTAMP(3),
    "durationMin" INTEGER NOT NULL,
    "protection" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "execId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CalendarWindow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Commitment" ADD CONSTRAINT "Commitment_execId_fkey" FOREIGN KEY ("execId") REFERENCES "Executive"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowUp" ADD CONSTRAINT "FollowUp_execId_fkey" FOREIGN KEY ("execId") REFERENCES "Executive"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingNote" ADD CONSTRAINT "MeetingNote_execId_fkey" FOREIGN KEY ("execId") REFERENCES "Executive"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeeklyReport" ADD CONSTRAINT "WeeklyReport_execId_fkey" FOREIGN KEY ("execId") REFERENCES "Executive"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DecisionBrief" ADD CONSTRAINT "DecisionBrief_execId_fkey" FOREIGN KEY ("execId") REFERENCES "Executive"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DraftCommunication" ADD CONSTRAINT "DraftCommunication_execId_fkey" FOREIGN KEY ("execId") REFERENCES "Executive"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SourceFeed" ADD CONSTRAINT "SourceFeed_execId_fkey" FOREIGN KEY ("execId") REFERENCES "Executive"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionItem" ADD CONSTRAINT "ActionItem_execId_fkey" FOREIGN KEY ("execId") REFERENCES "Executive"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EscalationEvent" ADD CONSTRAINT "EscalationEvent_execId_fkey" FOREIGN KEY ("execId") REFERENCES "Executive"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StakeholderAccount" ADD CONSTRAINT "StakeholderAccount_execId_fkey" FOREIGN KEY ("execId") REFERENCES "Executive"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalendarWindow" ADD CONSTRAINT "CalendarWindow_execId_fkey" FOREIGN KEY ("execId") REFERENCES "Executive"("id") ON DELETE SET NULL ON UPDATE CASCADE;
