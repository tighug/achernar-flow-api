import { JobCountOutput } from "./JobCountOutput";

export interface IJobCount {
  handle(): Promise<JobCountOutput>;
}
