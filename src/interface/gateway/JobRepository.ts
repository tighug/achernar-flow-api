import { ProcessCallbackFunction, Queue } from "bull";
import WebSocket, { Server } from "ws";
import { BidCaseJob } from "../../domain/model/BidCaseJob";
import { CaseJob } from "../../domain/model/CaseJob";
import { IJobRepository } from "../../domain/repository/IJobRepository";

export class JobRepository implements IJobRepository {
  private connected: WebSocket[] = [];

  constructor(
    private readonly caseQueue: Queue,
    private readonly bidCaseQueue: Queue,
    private readonly wss: Server
  ) {
    this.wss.on("connection", (ws) => {
      this.connected.push(ws);
      ws.on(
        "close",
        () => (this.connected = this.connected.filter((c) => c !== ws))
      );
    });
  }

  addCaseJob(id: number): Promise<CaseJob> {
    return this.caseQueue.add({ id });
  }

  addBidCaseJob(id: number): Promise<BidCaseJob> {
    return this.bidCaseQueue.add({ id });
  }

  processCaseJob(
    callback: ProcessCallbackFunction<{ id: number }>
  ): Promise<void> {
    return this.caseQueue.process(callback);
  }

  processBidCaseJob(
    callback: ProcessCallbackFunction<{ id: number }>
  ): Promise<void> {
    return this.bidCaseQueue.process(callback);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCaseJob(event: string, callback: (...args: any) => void): Queue {
    return this.caseQueue.on(event, callback);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onBidCaseJob(event: string, callback: (...args: any) => void): Queue {
    return this.bidCaseQueue.on(event, callback);
  }

  notify(type: string, id: number, status: string, agreedPrice?: number): void {
    this.connected.forEach((ws) =>
      ws.send(JSON.stringify({ type, id, status, agreedPrice }))
    );
  }
}
