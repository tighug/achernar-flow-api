import Bull, { Job, Queue } from "bull";
import createHttpError from "http-errors";
import { ICaseRepository } from "../../../domain/repository/ICaseRepository";
import { FlowService } from "../../../domain/service/FlowService";
import { CaseSimulateInput } from "./CaseSimulateInput";
import { CaseSimulateOutput } from "./CaseSimulateOutput";
import { ICaseSimulate } from "./ICaseSimulate";

export class CaseSimulate implements ICaseSimulate {
  private readonly simulateQueue: Queue;

  constructor(
    private readonly caseRepository: ICaseRepository,
    private readonly flowService: FlowService
  ) {
    this.simulateQueue = new Bull("case");
    this.simulateQueue.process("simulate", (job) => {
      try {
        console.dir(job.data);
        return this.flowService.calc(job.data.case);
      } catch (err) {
        console.error(err);
        return err;
      }
    });

    this.simulateQueue.on("active", async (job) => {
      await this.caseRepository.update({
        id: job.data.case.id,
        status: "active",
      });
    });

    this.simulateQueue.on("completed", async (job) => {
      await this.caseRepository.update({
        id: job.data.case.id,
        status: "completed",
      });
    });

    this.simulateQueue.on("failed", async (job) => {
      await this.caseRepository.update({
        id: job.data.case.id,
        status: "failed",
      });
    });
  }

  async handle({ id }: CaseSimulateInput): Promise<CaseSimulateOutput> {
    const c = await this.caseRepository.findOne({ id, fields: [] });

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
