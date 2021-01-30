import createHttpError from "http-errors";
import { Case } from "../../../domain/model/Case";
import { SimulateJob } from "../../../domain/model/SimulateJob";
import { ICaseRepository } from "../../../domain/repository/ICaseRepository";
import { IFlowRepository } from "../../../domain/repository/IFlowRepository";
import { IJobRepository } from "../../../domain/repository/IJobRepository";
import { ILoadRepository } from "../../../domain/repository/ILoadRepository";
import { FlowService } from "../../../domain/service/FlowService";
import { LoadService } from "../../../domain/service/LoadService";
import { IJobAdd } from "./IJobAdd";
import { JobAddInput } from "./JobAddInput";
import { JobAddOutput } from "./JobAddOutput";

export class JobAdd implements IJobAdd {
  constructor(
    private readonly loadService: LoadService,
    private readonly flowService: FlowService,
    private readonly jobRepository: IJobRepository,
    private readonly caseRepository: ICaseRepository,
    private readonly flowRepository: IFlowRepository,
    private readonly loadRepository: ILoadRepository
  ) {
    this.jobRepository.process(async ({ data }: SimulateJob) => {
      try {
        const c = (await this.caseRepository.findOne(
          data.caseId
        )) as Required<Case>;
        const [loads, pvs] = await this.loadService.getLoadsAndPVs(c);
        const flows = await this.flowService.calc(c, loads, pvs);

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
    this.jobRepository.on("active", async ({ data }: SimulateJob) => {
      this.updateAndNotify(data.caseId, "active");
    });
    this.jobRepository.on("completed", async ({ data }: SimulateJob) => {
      this.updateAndNotify(data.caseId, "completed");
    });
    this.jobRepository.on("failed", async ({ data }: SimulateJob) => {
      this.updateAndNotify(data.caseId, "failed");
    });
  }

  async handle({ caseId }: JobAddInput): Promise<JobAddOutput> {
    const c = await this.caseRepository.findOne(caseId);

    if (c === null)
      throw new createHttpError.NotFound("This case is not found.");
    if (c.status !== "waiting")
      throw new createHttpError.Conflict(
        "This case has already been simulated."
      );

    return this.jobRepository.add(caseId);
  }

  private async updateAndNotify(id: number, status: string): Promise<void> {
    await this.caseRepository.update(id, status);
    this.jobRepository.notify(id, status);
  }
}
