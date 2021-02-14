import createHttpError from "http-errors";
import { Case } from "../../../domain/model/Case";
import { CaseJob } from "../../../domain/model/CaseJob";
import { ICaseRepository } from "../../../domain/repository/ICaseRepository";
import { IFlowRepository } from "../../../domain/repository/IFlowRepository";
import { IJobRepository } from "../../../domain/repository/IJobRepository";
import { ILoadRepository } from "../../../domain/repository/ILoadRepository";
import { FlowService } from "../../../domain/service/FlowService";
import { LoadService } from "../../../domain/service/LoadService";
import { CaseQueueInput } from "./CaseQueueInput";
import { CaseQueueOutput } from "./CaseQueueOutput";
import { ICaseQueue } from "./ICaseQueue";

export class CaseQueue implements ICaseQueue {
  constructor(
    private readonly caseRepository: ICaseRepository,
    private readonly jobRepository: IJobRepository,
    private readonly loadService: LoadService,
    private readonly flowService: FlowService,
    private readonly flowRepository: IFlowRepository,
    private readonly loadRepository: ILoadRepository
  ) {
    this.jobRepository.processCaseJob(async ({ data }: CaseJob) => {
      try {
        const c = (await this.caseRepository.findOne(
          data.id
        )) as Required<Case>;
        const [loads, pvs] = await this.loadService.getLoadsAndPVs(c);
        const flows = await this.flowService.calc(c, loads, pvs);

        flows.forEach(async (f) => await this.flowRepository.save(f));
        loads.forEach(async (l) => await this.loadRepository.save(l));
        pvs.forEach(async (pv) => await this.loadRepository.save(pv));
      } catch (err) {
        console.error(err);
        return err;
      }
    });
    this.jobRepository.onCaseJob("active", async ({ data }: CaseJob) => {
      this.updateAndNotify(data.id, "active");
    });
    this.jobRepository.onCaseJob("completed", async ({ data }: CaseJob) => {
      this.updateAndNotify(data.id, "completed");
    });
    this.jobRepository.onCaseJob("failed", async ({ data }: CaseJob) => {
      this.updateAndNotify(data.id, "failed");
    });
  }

  async handle({ id }: CaseQueueInput): Promise<CaseQueueOutput> {
    const c = await this.caseRepository.findOne(id);

    if (c === null) throw new createHttpError.NotFound("Case is not found.");
    if (c.status !== "waiting")
      throw new createHttpError.Conflict("This case has already been queued.");

    return this.jobRepository.addCaseJob(id);
  }

  private async updateAndNotify(id: number, status: string): Promise<void> {
    await this.caseRepository.update(id, status);
    this.jobRepository.notify("case", id, status);
  }
}
