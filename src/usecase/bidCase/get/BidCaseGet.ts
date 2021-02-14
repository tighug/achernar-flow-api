import { IBidCaseRepository } from "../../../domain/repository/IBidCaseRepository";
import { BidCaseGetInput } from "./BidCaseGetInput";
import { BidCaseGetOutput } from "./BidCaseGetOutput";
import { IBidCaseGet } from "./IBidCaseGet";

export class BidCaseGet implements IBidCaseGet {
  constructor(private readonly bidCaseRepository: IBidCaseRepository) {}

  handle({ id, fields }: BidCaseGetInput): Promise<BidCaseGetOutput> {
    return this.bidCaseRepository.findOne(id, fields);
  }
}
