import createHttpError from "http-errors";
import { BidCase } from "../../../domain/model/BidCase";
import { Case } from "../../../domain/model/Case";
import { IBidCaseRepository } from "../../../domain/repository/IBidCaseRepository";
import { ICaseRepository } from "../../../domain/repository/ICaseRepository";
import { BidCaseRegisterInput } from "./BidCaseRegisterInput";
import { BidCaseRegisterOutput } from "./BidCaseRegisterOutput";
import { IBidCaseRegister } from "./IBidCaseRegister";

export class BidCaseRegister implements IBidCaseRegister {
  constructor(
    private readonly bidCaseRepository: IBidCaseRepository,
    private readonly caseRepository: ICaseRepository
  ) {}

  async handle({
    caseId,
    ...props
  }: BidCaseRegisterInput): Promise<BidCaseRegisterOutput> {
    const c = (await this.caseRepository.findOne(caseId)) as Case | null;

    if (c === null) throw new createHttpError.NotFound("case is not found.");

    return this.bidCaseRepository.save(new BidCase({ case: c, ...props }));
  }
}
