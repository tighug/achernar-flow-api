import { Job } from "bull";

export type SimulateJob = Job<{ caseId: number }>;
