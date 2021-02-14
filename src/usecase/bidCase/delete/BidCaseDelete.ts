import createHttpError from "http-errors";
import { IBidCaseRepository } from "../../../domain/repository/IBidCaseRepository";
import { CaseDeleteOutput } from "../../case/delete/CaseDeleteOutput";
import { BidCaseDeleteInput } from "./BidCaseDeleteInput";
import { IBidCaseDelete } from "./IBidCaseDelete";

export class BidCaseDelete implements IBidCaseDelete {
  constructor(private readonly bidCaseRepository: IBidCaseRepository) {}

  async handle({ id }: BidCaseDeleteInput): Promise<CaseDeleteOutput> {
    if ((await this.bidCaseRepository.findOne(id)) === null)
      throw new createHttpError.NotFound("Not found.");

    return this.bidCaseRepository.delete(id);
  }
}
