export interface PageConfig {
  label: string;
  href: string;
  description: string;
  entities: string[];
  workflows: string[];
}

export interface EntityConfig {
  name: string;
  label: string;
  fields: Array<{ name: string; kind: "string" | "number" | "boolean" | "date" }>;
}

export interface WorkflowConfig {
  slug: string;
  title: string;
  description: string;
  prompt: string;
  fields: string[];
}

export const appConfig = {
  slug: "ai-operations-chief-of-staff",
  title: "AI Operations Chief of Staff",
  tagline: "Commitment tracking and executive communication drafting",
  accent: "red",
};

export const pages: PageConfig[] = [
  {
    label: "Commitments",
    href: "/commitments",
    description: "Commitments, action items, follow-ups.",
    entities: ["Commitment", "ActionItem", "FollowUp"],
    workflows: ["commitment-scan"],
  },
  {
    label: "Meetings",
    href: "/meetings",
    description: "Meeting notes, calendar windows, stakeholders.",
    entities: ["MeetingNote", "CalendarWindow", "StakeholderAccount"],
    workflows: ["notes-structure"],
  },
  {
    label: "Reports & Briefs",
    href: "/reports",
    description: "Weekly reports, decision briefs, drafts.",
    entities: ["WeeklyReport", "DecisionBrief", "DraftCommunication"],
    workflows: ["brief-draft"],
  },
  {
    label: "Sources",
    href: "/sources",
    description: "Source feeds, escalations, executives.",
    entities: ["SourceFeed", "EscalationEvent", "Executive"],
    workflows: [],
  },
];

export const entities: Record<string, EntityConfig> = {
  Executive: {
    name: "Executive",
    label: "Executive",
    fields: [{ name: "name", kind: "string" }, { name: "title", kind: "string" }, { name: "office", kind: "string" }, { name: "assistant", kind: "string" }, { name: "status", kind: "string" }, { name: "timezone", kind: "string" }],
  },
  Commitment: {
    name: "Commitment",
    label: "Commitment",
    fields: [{ name: "who", kind: "string" }, { name: "what", kind: "string" }, { name: "source", kind: "string" }, { name: "dueDate", kind: "date" }, { name: "status", kind: "string" }, { name: "noticedAt", kind: "string" }],
  },
  FollowUp: {
    name: "FollowUp",
    label: "Follow-Up",
    fields: [{ name: "commitmentRef", kind: "string" }, { name: "recipient", kind: "string" }, { name: "draftBody", kind: "string" }, { name: "channel", kind: "string" }, { name: "status", kind: "string" }, { name: "sentAt", kind: "date" }],
  },
  MeetingNote: {
    name: "MeetingNote",
    label: "Meeting Note",
    fields: [{ name: "meeting", kind: "string" }, { name: "attendees", kind: "string" }, { name: "keyDecisions", kind: "string" }, { name: "actionItems", kind: "string" }, { name: "status", kind: "string" }, { name: "heldAt", kind: "date" }],
  },
  WeeklyReport: {
    name: "WeeklyReport",
    label: "Weekly Report",
    fields: [{ name: "period", kind: "string" }, { name: "highlights", kind: "string" }, { name: "risks", kind: "string" }, { name: "asks", kind: "string" }, { name: "status", kind: "string" }, { name: "sentAt", kind: "date" }],
  },
  DecisionBrief: {
    name: "DecisionBrief",
    label: "Decision Brief",
    fields: [{ name: "topic", kind: "string" }, { name: "options", kind: "string" }, { name: "recommendation", kind: "string" }, { name: "status", kind: "string" }, { name: "dueDate", kind: "date" }, { name: "decision", kind: "string" }],
  },
  DraftCommunication: {
    name: "DraftCommunication",
    label: "Draft",
    fields: [{ name: "kind", kind: "string" }, { name: "audience", kind: "string" }, { name: "subject", kind: "string" }, { name: "body", kind: "string" }, { name: "status", kind: "string" }, { name: "approvedBy", kind: "string" }],
  },
  SourceFeed: {
    name: "SourceFeed",
    label: "Source Feed",
    fields: [{ name: "system", kind: "string" }, { name: "scope", kind: "string" }, { name: "scopeDetail", kind: "string" }, { name: "status", kind: "string" }, { name: "lastSyncedAt", kind: "date" }, { name: "itemsSynced", kind: "number" }],
  },
  ActionItem: {
    name: "ActionItem",
    label: "Action Item",
    fields: [{ name: "owner", kind: "string" }, { name: "item", kind: "string" }, { name: "fromMeeting", kind: "string" }, { name: "status", kind: "string" }, { name: "dueDate", kind: "date" }, { name: "notes", kind: "string" }],
  },
  EscalationEvent: {
    name: "EscalationEvent",
    label: "Escalation",
    fields: [{ name: "trigger", kind: "string" }, { name: "severity", kind: "string" }, { name: "notified", kind: "string" }, { name: "status", kind: "string" }, { name: "raisedAt", kind: "date" }, { name: "outcome", kind: "string" }],
  },
  StakeholderAccount: {
    name: "StakeholderAccount",
    label: "Stakeholder",
    fields: [{ name: "name", kind: "string" }, { name: "relationship", kind: "string" }, { name: "accountabilityArea", kind: "string" }, { name: "health", kind: "string" }, { name: "status", kind: "string" }, { name: "lastContact", kind: "date" }],
  },
  CalendarWindow: {
    name: "CalendarWindow",
    label: "Calendar Window",
    fields: [{ name: "purpose", kind: "string" }, { name: "attendees", kind: "string" }, { name: "startAt", kind: "date" }, { name: "durationMin", kind: "number" }, { name: "protection", kind: "string" }, { name: "status", kind: "string" }],
  },
};

export const workflows: WorkflowConfig[] = [
  {
    slug: "commitment-scan",
    title: "Draft: Commitment Scanner",
    description: "Find commitments and missed follow-ups.",
    prompt: "You are an executive chief of staff. Extract commitments from the text, flag overdue or at-risk ones, and suggest follow-up language.",
    fields: ["sourceText", "owner", "timeframe", "stakes"],
  },
  {
    slug: "notes-structure",
    title: "Draft: Meeting Note Structurer",
    description: "Structure raw meeting notes.",
    prompt: "You are an executive assistant. Structure the raw meeting notes into decisions, action items with owners and due dates, and open questions.",
    fields: ["rawNotes", "attendees", "meetingGoal", "duration"],
  },
  {
    slug: "brief-draft",
    title: "Draft: Decision Brief Drafter",
    description: "Draft an executive decision brief.",
    prompt: "You are a chief of staff. Draft a one-page decision brief: context, options with trade-offs, recommendation, risks, and requested decision.",
    fields: ["topic", "options", "constraints", "decisionMaker"],
  },
];

export function findPage(href: string): PageConfig | undefined {
  return pages.find((p) => p.href === href);
}
