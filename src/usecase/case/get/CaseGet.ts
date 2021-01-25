import { ICaseRepository } from "../../../domain/repository/ICaseRepository";
import { CaseGetInput } from "./CaseGetInput";
import { CaseGetOutput } from "./CaseGetOutput";
import { ICaseGet } from "./ICaseGet";

export class CaseGet implements ICaseGet {
  constructor(private readonly caseRepository: ICaseRepository) {}

  handle(props: CaseGetInput): Promise<CaseGetOutput> {
    return this.caseRepository.findOne(props);
  }
}
