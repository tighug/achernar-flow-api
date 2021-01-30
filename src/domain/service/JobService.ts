import { Case } from "../model/Case";
import { SimulateJob } from "../model/SimulateJob";
import { ICaseRepository } from "../repository/ICaseRepository";
import { IFlowRepository } from "../repository/IFlowRepository";
import { IJobRepository } from "../repository/IJobRepository";
import { ILoadRepository } from "../repository/ILoadRepository";
import { FlowService } from "./FlowService";
import { LoadService } from "./LoadService";

export class JobService {
  constructor(
    private readonly loadService: LoadService,
    private readonly flowService: FlowService,
    private readonly caseRepository: ICaseRepository,
    private readonly flowRepository: IFlowRepository,
    private readonly loadRepository: ILoadRepository,
    private readonly jobRepository: IJobRepository
  ) {
    this.jobRepository.process("simulate", async ({ data }: SimulateJob) => {
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
      this.updateAndNotify(data.caseId, status);
    });
    this.jobRepository.on("completed", async ({ data }: SimulateJob) => {
      this.updateAndNotify(data.caseId, "completed");
    });
    this.jobRepository.on("failed", async ({ data }: SimulateJob) => {
      this.updateAndNotify(data.caseId, "failed");
    });
  }

  private async updateAndNotify(id: number, status: string): Promise<void> {
    await this.caseRepository.update(id, status);
    this.jobRepository.notify(id, status);
  }
}
