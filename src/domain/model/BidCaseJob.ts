import { Job } from "bull";

export type BidCaseJob = Job<{ id: number }>;
