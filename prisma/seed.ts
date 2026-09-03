// Seed script — creates demo users and realistic domain records.
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const phones = ["(415) 555-0132", "(212) 555-0187", "(312) 555-0149", "(617) 555-0110"];
const cities = ["Chicago, IL", "Austin, TX", "Boston, MA", "Denver, CO", "Seattle, WA"];

function pick<T>(arr: T[], i: number): T { return arr[i % arr.length]; }
function amount(i: number, base = 1000): number { return Math.round((base + ((i * 7919) % 900) * base) * 100) / 100; }
function daysAgo(i: number, spread = 180): Date { return new Date(Date.now() - ((i * 37) % spread) * 86400000); }

async function main() {
  const passwordHash = await bcrypt.hash("Demo!23456", 12);
  const demoUsers: Array<[string, string, Role]> = [
    ["admin@ai-operations-chief-of-staff.local", "Demo Admin", "ADMIN"],
    ["manager@ai-operations-chief-of-staff.local", "Demo Manager", "MANAGER"],
    ["analyst@ai-operations-chief-of-staff.local", "Demo Analyst", "ANALYST"],
  ];
  for (const [email, name, role] of demoUsers) {
    await prisma.user.upsert({ where: { email }, update: {}, create: { email, name, role, passwordHash } });
  }

  const STATUSES_Executive = ["OPEN", "IN_REVIEW", "APPROVED", "CLOSED"];
  await prisma.executive.deleteMany();
  for (let i = 0; i < 25; i++) {
    await prisma.executive.create({
      data: {
      name: `Name ${String(i + 1).padStart(3, "0")}`,
      title: `Title ${String(i + 1).padStart(3, "0")}`,
      office: `Office ${String(i + 1).padStart(3, "0")}`,
      assistant: `Assistant ${String(i + 1).padStart(3, "0")}`,
      status: pick(STATUSES_Executive, i),
      timezone: `Timezone ${String(i + 1).padStart(3, "0")}`
      },
    });
  }

  const executiveRefs = await prisma.executive.findMany({ select: { id: true } });

  const STATUSES_Commitment = ["PENDING", "AT_RISK", "OVERDUE", "DONE"];
  await prisma.commitment.deleteMany();
  for (let i = 0; i < 25; i++) {
    await prisma.commitment.create({
      data: {
      who: `Who ${String(i + 1).padStart(3, "0")}`,
      what: `What ${String(i + 1).padStart(3, "0")}`,
      source: `Source ${String(i + 1).padStart(3, "0")}`,
      dueDate: daysAgo(i),
      status: pick(STATUSES_Commitment, i),
      noticedAt: `NoticedAt ${String(i + 1).padStart(3, "0")}`,
      exec: { connect: { id: executiveRefs[i % executiveRefs.length].id } }
      },
    });
  }

  const STATUSES_FollowUp = ["OPEN", "IN_REVIEW", "APPROVED", "CLOSED"];
  await prisma.followUp.deleteMany();
  for (let i = 0; i < 25; i++) {
    await prisma.followUp.create({
      data: {
      commitmentRef: `CommitmentRef ${String(i + 1).padStart(3, "0")}`,
      recipient: `Recipient ${String(i + 1).padStart(3, "0")}`,
      draftBody: `DraftBody ${String(i + 1).padStart(3, "0")}`,
      channel: `Channel ${String(i + 1).padStart(3, "0")}`,
      status: pick(STATUSES_FollowUp, i),
      sentAt: daysAgo(i),
      exec: { connect: { id: executiveRefs[i % executiveRefs.length].id } }
      },
    });
  }

  const STATUSES_MeetingNote = ["OPEN", "IN_REVIEW", "APPROVED", "CLOSED"];
  await prisma.meetingNote.deleteMany();
  for (let i = 0; i < 25; i++) {
    await prisma.meetingNote.create({
      data: {
      meeting: `Meeting ${String(i + 1).padStart(3, "0")}`,
      attendees: `Attendees ${String(i + 1).padStart(3, "0")}`,
      keyDecisions: `KeyDecisions ${String(i + 1).padStart(3, "0")}`,
      actionItems: `ActionItems ${String(i + 1).padStart(3, "0")}`,
      status: pick(STATUSES_MeetingNote, i),
      heldAt: daysAgo(i),
      exec: { connect: { id: executiveRefs[i % executiveRefs.length].id } }
      },
    });
  }

  const STATUSES_WeeklyReport = ["DRAFTING", "REVIEW", "SENT"];
  await prisma.weeklyReport.deleteMany();
  for (let i = 0; i < 25; i++) {
    await prisma.weeklyReport.create({
      data: {
      period: `Period ${String(i + 1).padStart(3, "0")}`,
      highlights: `Highlights ${String(i + 1).padStart(3, "0")}`,
      risks: `Risks ${String(i + 1).padStart(3, "0")}`,
      asks: `Asks ${String(i + 1).padStart(3, "0")}`,
      status: pick(STATUSES_WeeklyReport, i),
      sentAt: daysAgo(i),
      exec: { connect: { id: executiveRefs[i % executiveRefs.length].id } }
      },
    });
  }

  const STATUSES_DecisionBrief = ["DRAFT", "CIRCULATED", "DECIDED"];
  await prisma.decisionBrief.deleteMany();
  for (let i = 0; i < 25; i++) {
    await prisma.decisionBrief.create({
      data: {
      topic: `Topic ${String(i + 1).padStart(3, "0")}`,
      options: `Options ${String(i + 1).padStart(3, "0")}`,
      recommendation: `Recommendation ${String(i + 1).padStart(3, "0")}`,
      status: pick(STATUSES_DecisionBrief, i),
      dueDate: daysAgo(i),
      decision: `Decision ${String(i + 1).padStart(3, "0")}`,
      exec: { connect: { id: executiveRefs[i % executiveRefs.length].id } }
      },
    });
  }

  const STATUSES_DraftCommunication = ["OPEN", "IN_REVIEW", "APPROVED", "CLOSED"];
  await prisma.draftCommunication.deleteMany();
  for (let i = 0; i < 25; i++) {
    await prisma.draftCommunication.create({
      data: {
      kind: `Kind ${String(i + 1).padStart(3, "0")}`,
      audience: `Audience ${String(i + 1).padStart(3, "0")}`,
      subject: `Subject ${String(i + 1).padStart(3, "0")}`,
      body: `Body ${String(i + 1).padStart(3, "0")}`,
      status: pick(STATUSES_DraftCommunication, i),
      approvedBy: `ApprovedBy ${String(i + 1).padStart(3, "0")}`,
      exec: { connect: { id: executiveRefs[i % executiveRefs.length].id } }
      },
    });
  }

  const STATUSES_SourceFeed = ["OPEN", "IN_REVIEW", "APPROVED", "CLOSED"];
  await prisma.sourceFeed.deleteMany();
  for (let i = 0; i < 25; i++) {
    await prisma.sourceFeed.create({
      data: {
      system: `System ${String(i + 1).padStart(3, "0")}`,
      scope: `Scope ${String(i + 1).padStart(3, "0")}`,
      scopeDetail: `ScopeDetail ${String(i + 1).padStart(3, "0")}`,
      status: pick(STATUSES_SourceFeed, i),
      lastSyncedAt: daysAgo(i),
      itemsSynced: 5 + ((i * 13) % 95),
      exec: { connect: { id: executiveRefs[i % executiveRefs.length].id } }
      },
    });
  }

  const STATUSES_ActionItem = ["OPEN", "IN_REVIEW", "APPROVED", "CLOSED"];
  await prisma.actionItem.deleteMany();
  for (let i = 0; i < 25; i++) {
    await prisma.actionItem.create({
      data: {
      owner: `Owner ${String(i + 1).padStart(3, "0")}`,
      item: `Item ${String(i + 1).padStart(3, "0")}`,
      fromMeeting: `FromMeeting ${String(i + 1).padStart(3, "0")}`,
      status: pick(STATUSES_ActionItem, i),
      dueDate: daysAgo(i),
      notes: `Notes ${String(i + 1).padStart(3, "0")}`,
      exec: { connect: { id: executiveRefs[i % executiveRefs.length].id } }
      },
    });
  }

  const STATUSES_EscalationEvent = ["OPEN", "IN_REVIEW", "APPROVED", "CLOSED"];
  await prisma.escalationEvent.deleteMany();
  for (let i = 0; i < 25; i++) {
    await prisma.escalationEvent.create({
      data: {
      trigger: `Trigger ${String(i + 1).padStart(3, "0")}`,
      severity: `Severity ${String(i + 1).padStart(3, "0")}`,
      notified: `Notified ${String(i + 1).padStart(3, "0")}`,
      status: pick(STATUSES_EscalationEvent, i),
      raisedAt: daysAgo(i),
      outcome: `Outcome ${String(i + 1).padStart(3, "0")}`,
      exec: { connect: { id: executiveRefs[i % executiveRefs.length].id } }
      },
    });
  }

  const STATUSES_StakeholderAccount = ["OPEN", "IN_REVIEW", "APPROVED", "CLOSED"];
  await prisma.stakeholderAccount.deleteMany();
  for (let i = 0; i < 25; i++) {
    await prisma.stakeholderAccount.create({
      data: {
      name: `Name ${String(i + 1).padStart(3, "0")}`,
      relationship: `Relationship ${String(i + 1).padStart(3, "0")}`,
      accountabilityArea: `AccountabilityArea ${String(i + 1).padStart(3, "0")}`,
      health: `Health ${String(i + 1).padStart(3, "0")}`,
      status: pick(STATUSES_StakeholderAccount, i),
      lastContact: daysAgo(i),
      exec: { connect: { id: executiveRefs[i % executiveRefs.length].id } }
      },
    });
  }

  const STATUSES_CalendarWindow = ["OPEN", "IN_REVIEW", "APPROVED", "CLOSED"];
  await prisma.calendarWindow.deleteMany();
  for (let i = 0; i < 25; i++) {
    await prisma.calendarWindow.create({
      data: {
      purpose: `Purpose ${String(i + 1).padStart(3, "0")}`,
      attendees: `Attendees ${String(i + 1).padStart(3, "0")}`,
      startAt: daysAgo(i),
      durationMin: 5 + ((i * 13) % 95),
      protection: `Protection ${String(i + 1).padStart(3, "0")}`,
      status: pick(STATUSES_CalendarWindow, i),
      exec: { connect: { id: executiveRefs[i % executiveRefs.length].id } }
      },
    });
  }

  await prisma.auditLog.create({ data: { actorName: "Seeder", action: "SEED", entity: "system", detail: "Demo dataset created" } });

  console.log("Seeded demo users and domain records.");
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
