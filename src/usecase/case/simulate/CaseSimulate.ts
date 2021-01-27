import Bull, { Queue } from "bull";
import createHttpError from "http-errors";
import { ICaseRepository } from "../../../domain/repository/ICaseRepository";
import { FlowService } from "../../../domain/service/FlowService";
import { LoadService } from "../../../domain/service/LoadService";
import { CaseSimulateInput } from "./CaseSimulateInput";
import { CaseSimulateOutput } from "./CaseSimulateOutput";
import { ICaseSimulate } from "./ICaseSimulate";

export class CaseSimulate implements ICaseSimulate {
  private readonly simulateQueue: Queue;

  constructor(
    private readonly caseRepository: ICaseRepository,
    private readonly flowService: FlowService,
    private readonly loadService: LoadService
  ) {
    this.simulateQueue = new Bull("case");

    this.simulateQueue.process("simulate", async (job) => {
      try {
        const [loads, pvs] = await this.loadService.getLoadsAndPVs(
          job.data.case
        );
        return this.flowService.calc(job.data.case, loads, pvs);
      } catch (err) {
        console.error(err);
        return err;
      }
    });

    this.simulateQueue.on("active", async (job) => {
      await this.caseRepository.update(job.data.case.id, "active");
    });

    this.simulateQueue.on("completed", async (job) => {
      await this.caseRepository.update(job.data.case.id, "completed");
    });

    this.simulateQueue.on("failed", async (job) => {
      await this.caseRepository.update(job.data.case.id, "failed");
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
