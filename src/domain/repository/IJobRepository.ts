import { JobCounts, ProcessCallbackFunction, Queue } from "bull";
import { SimulateJob } from "../model/SimulateJob";

export interface IJobRepository {
  add(caseId: number): Promise<SimulateJob>;
  count(): Promise<JobCounts>;
  process(
    name: string,
    callback: ProcessCallbackFunction<{ caseId: number }>
  ): void;
  on(event: string, callback: (...args: any) => void): Queue;
  notify(id: number, status: string): void;
}
