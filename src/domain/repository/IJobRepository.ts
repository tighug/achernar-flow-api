import { JobCounts, ProcessCallbackFunction, Queue } from "bull";
import { SimulateJob } from "../model/SimulateJob";

export interface IJobRepository {
  add(caseId: number): Promise<SimulateJob>;
  count(): Promise<JobCounts>;
  process(callback: ProcessCallbackFunction<{ caseId: number }>): Promise<void>;
  on(event: string, callback: (...args: any) => void): Queue;
  notify(id: number, status: string): void;
}
