import { JobCounts, ProcessCallbackFunction, Queue } from "bull";
import WebSocket, { Server } from "ws";
import { SimulateJob } from "../../domain/model/SimulateJob";
import { IJobRepository } from "../../domain/repository/IJobRepository";

export class JobRepository implements IJobRepository {
  private connected: WebSocket[] = [];

  constructor(private readonly queue: Queue, private readonly wss: Server) {
    this.wss.on("connection", (ws) => {
      ws.send("connected");
      this.connected.push(ws);
      ws.on(
        "close",
        () => (this.connected = this.connected.filter((c) => c !== ws))
      );
    });
  }

  async add(caseId: number): Promise<SimulateJob> {
    return await this.queue.add({ caseId });
  }

  count(): Promise<JobCounts> {
    return this.queue.getJobCounts();
  }

  process(
    callback: ProcessCallbackFunction<{ caseId: number }>
  ): Promise<void> {
    return this.queue.process(callback);
  }

  on(event: string, callback: (...args: any) => void): Queue {
    return this.queue.on(event, callback);
  }

  notify(id: number, status: string): void {
    this.connected.forEach((ws) => ws.send(JSON.stringify({ id, status })));
  }
}
