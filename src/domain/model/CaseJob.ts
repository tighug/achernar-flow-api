import { Job } from "bull";

export type CaseJob = Job<{ id: number }>;
