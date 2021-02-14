import { ProcessCallbackFunction, Queue } from "bull";
import { BidCaseJob } from "../model/BidCaseJob";
import { CaseJob as CaseJob } from "../model/CaseJob";

export interface IJobRepository {
  addCaseJob(id: number): Promise<CaseJob>;
  addBidCaseJob(id: number): Promise<BidCaseJob>;
  processCaseJob(
    callback: ProcessCallbackFunction<{ id: number }>
  ): Promise<void>;
  processBidCaseJob(
    callback: ProcessCallbackFunction<{ id: number }>
  ): Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCaseJob(event: string, callback: (...args: any) => void): Queue;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onBidCaseJob(event: string, callback: (...args: any) => void): Queue;
  notify(type: string, id: number, status: string): void;
}
