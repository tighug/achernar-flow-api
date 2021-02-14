import { IBidCaseRepository } from "../../../domain/repository/IBidCaseRepository";
import { BidCaseListInput } from "./BidCaseListInput";
import { BidCaseListOutput } from "./BidCaseListOutput";
import { IBidCaseList } from "./IBidCaseList";

export class BidCaseList implements IBidCaseList {
  constructor(private readonly bidCaseRepository: IBidCaseRepository) {}

  handle({ caseId, fields }: BidCaseListInput): Promise<BidCaseListOutput> {
    return this.bidCaseRepository.findMany(caseId, fields);
  }
}
