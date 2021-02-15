import createHttpError from "http-errors";
import { BidCase } from "../../../domain/model/BidCase";
import { BidCaseJob } from "../../../domain/model/BidCaseJob";
import { Case } from "../../../domain/model/Case";
import { Flow } from "../../../domain/model/Flow";
import { Load } from "../../../domain/model/Load";
import { NodalPrice } from "../../../domain/model/NodalPrice";
import { IBidCaseRepository } from "../../../domain/repository/IBidCaseRepository";
import { IBidderRepository } from "../../../domain/repository/IBidderRepository";
import { IFlowRepository } from "../../../domain/repository/IFlowRepository";
import { IJobRepository } from "../../../domain/repository/IJobRepository";
import { ILoadRepository } from "../../../domain/repository/ILoadRepository";
import { INodalPriceRepository } from "../../../domain/repository/INodalPriceRepository";
import { BidderService } from "../../../domain/service/BidderService";
import { FlowService } from "../../../domain/service/FlowService";
import { NodalPriceService } from "../../../domain/service/NodalPriceService";
import { BidCaseQueueInput } from "./BidCaseQueueInput";
import { BidCaseQueueOutput } from "./BidCaseQueueOutput";
import { IBidCaseQueue } from "./IBidCaseQueue";

export class BidCaseQueue implements IBidCaseQueue {
  constructor(
    private readonly bidCaseRepository: IBidCaseRepository,
    private readonly jobRepository: IJobRepository,
    private readonly loadRepository: ILoadRepository,
    private readonly bidderRepository: IBidderRepository,
    private readonly flowRepository: IFlowRepository,
    private readonly nodalPriceRepository: INodalPriceRepository,
    private readonly flowService: FlowService
  ) {
    this.jobRepository.processBidCaseJob(async ({ data }: BidCaseJob) => {
      try {
        const bidCase = (await this.bidCaseRepository.findOne(
          data.id
        )) as Required<BidCase>;
        const flows = (await this.flowRepository.findMany({
          caseId: bidCase.case.id as number,
          bidCaseId: bidCase.id,
          type: "before",
        })) as Flow[];
        const loads = (await this.loadRepository.findMany({
          caseId: bidCase.case.id as number,
          type: "load",
        })) as Load[];
        const pvs = (await this.loadRepository.findMany({
          caseId: bidCase.case.id as number,
          type: "pv",
        })) as Load[];
        const [buyers, sellers] = await BidderService.getBuyersAndSellers(
          bidCase,
          loads,
          pvs
        );

        const nodalPrices = flows.map(
          (f) => new NodalPrice({ bidCase, node: f.line.nextNode })
        );
        for (let i = 0; ; i++) {
          const [agreedPrice, gap] = BidderService.calcAgreedPrice(
            buyers,
            sellers,
            nodalPrices
          );
          const flows = await this.flowService.calc(
            bidCase.case as Required<Case>,
            loads,
            pvs,
            buyers,
            sellers,
            agreedPrice,
            gap
          );

          if (i === 0) {
            for (let i = 0; i < flows.length; i++) {
              flows[i].type = "after";
              flows[i].bidCaseId = bidCase.id;
              await this.flowRepository.save(flows[i]);
            }
          }

          if (flows.every((f) => f.nextNodeV <= 253 && f.nextNodeV >= 216.2)) {
            console.log(i);
            for (let i = 0; i < buyers.length; i++) {
              await this.bidderRepository.save(buyers[i]);
            }
            for (let i = 0; i < sellers.length; i++) {
              await this.bidderRepository.save(sellers[i]);
            }
            for (let i = 0; i < nodalPrices.length; i++) {
              await this.nodalPriceRepository.save(nodalPrices[i]);
            }
            if (i !== 0)
              for (let i = 0; i < flows.length; i++) {
                flows[i].type = "fixed";
                flows[i].bidCaseId = bidCase.id;
                await this.flowRepository.save(flows[i]);
              }
            await this.bidCaseRepository.update(
              bidCase.id,
              "completed",
              agreedPrice
            );

            break;
          }

          NodalPriceService.calcLagrange(flows, nodalPrices);
          NodalPriceService.calcNodalPrices(flows, nodalPrices);
        }
      } catch (err) {
        console.error(err);
        return err;
      }
    });

    this.jobRepository.onBidCaseJob("active", async ({ data }: BidCaseJob) => {
      await this.bidCaseRepository.update(data.id, "active", 0);
      this.jobRepository.notify("bidCase", data.id, "active", 0);
    });
    this.jobRepository.onBidCaseJob(
      "completed",
      async ({ data }: BidCaseJob) => {
        this.jobRepository.notify("bidCase", data.id, "completed", 0);
      }
    );
    this.jobRepository.onBidCaseJob("failed", async ({ data }: BidCaseJob) => {
      await this.bidCaseRepository.update(data.id, "failed", 0);
      this.jobRepository.notify("bidCase", data.id, "failed", 0);
    });
  }

  async handle({ id }: BidCaseQueueInput): Promise<BidCaseQueueOutput> {
    const bidCase = await this.bidCaseRepository.findOne(id);

    if (bidCase === null)
      throw new createHttpError.NotFound("The bidCase is not found.");
    if (bidCase.status !== "waiting")
      throw new createHttpError.Conflict(
        "This bidCase has already been queued."
      );

    return await this.jobRepository.addBidCaseJob(id);
  }
}
