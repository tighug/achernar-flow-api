import Bull, { Queue } from "bull";
import createHttpError from "http-errors";
import WebSocket, { Server } from "ws";
import { ICaseRepository } from "../../../domain/repository/ICaseRepository";
import { IFlowRepository } from "../../../domain/repository/IFlowRepository";
import { ILoadRepository } from "../../../domain/repository/ILoadRepository";
import { FlowService } from "../../../domain/service/FlowService";
import { LoadService } from "../../../domain/service/LoadService";
import { CaseSimulateInput } from "./CaseSimulateInput";
import { CaseSimulateOutput } from "./CaseSimulateOutput";
import { ICaseSimulate } from "./ICaseSimulate";

export class CaseSimulate implements ICaseSimulate {
  private readonly simulateQueue: Queue;
  private readonly connected: WebSocket[] = [];

  constructor(
    private readonly caseRepository: ICaseRepository,
    private readonly flowRepository: IFlowRepository,
    private readonly loadRepository: ILoadRepository,
    private readonly flowService: FlowService,
    private readonly loadService: LoadService,
    private readonly wss: Server
  ) {
    this.simulateQueue = new Bull("case");
    this.wss.on("connection", (ws) => {
      ws.send("connected");
      this.connected.push(ws);
    });

    this.simulateQueue.process("simulate", async (job) => {
      try {
        const [loads, pvs] = await this.loadService.getLoadsAndPVs(
          job.data.case
        );
        const flows = await this.flowService.calc(job.data.case, loads, pvs);
        for (let i = 0; i < flows.length; i++) {
          await this.flowRepository.save(flows[i]);
        }
        for (let i = 0; i < loads.length; i++) {
          await this.loadRepository.save(loads[i]);
        }
        for (let i = 0; i < pvs.length; i++) {
          await this.loadRepository.save(pvs[i]);
        }
      } catch (err) {
        console.error(err);
        return err;
      }
    });

    this.simulateQueue.on("active", async (job) => {
      const { id } = job.data.case;
      const status = "active";
      await this.caseRepository.update(id, status);
      this.connected.forEach((ws) => ws.send(JSON.stringify({ id, status })));
    });

    this.simulateQueue.on("completed", async (job) => {
      const { id } = job.data.case;
      const status = "completed";
      await this.caseRepository.update(id, status);
      this.connected.forEach((ws) => ws.send(JSON.stringify({ id, status })));
    });

    this.simulateQueue.on("failed", async (job) => {
      const { id } = job.data.case;
      const status = "failed";
      await this.caseRepository.update(id, status);
      this.connected.forEach((ws) => ws.send(JSON.stringify({ id, status })));
    });
  }

  async handle({ id }: CaseSimulateInput): Promise<CaseSimulateOutput> {
    const c = await this.caseRepository.findOne(id);

    if (c === null) throw new createHttpError.NotFound("Not Found.");
    if (c.status !== "waiting")
      throw new createHttpError.Conflict(
        "This case has already been simulated."
      );

    this.simulateQueue.add("simulate", { case: c });
    c.status = "active";

    return c;
  }
}
