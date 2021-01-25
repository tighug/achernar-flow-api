import { ICaseRepository } from "../../../domain/repository/ICaseRepository";
import { CaseListInput } from "./CaseListInput";
import { CaseListOutput } from "./CaseListOutput";
import { ICaseList } from "./ICaseList";

export class CaseList implements ICaseList {
  constructor(private readonly caseRepository: ICaseRepository) {}

  handle(props: CaseListInput): Promise<CaseListOutput> {
    return this.caseRepository.findMany(props);
  }
}
