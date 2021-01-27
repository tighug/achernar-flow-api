import { ICaseRepository } from "../../../domain/repository/ICaseRepository";
import { CaseListInput } from "./CaseListInput";
import { CaseListOutput } from "./CaseListOutput";
import { ICaseList } from "./ICaseList";

export class CaseList implements ICaseList {
  constructor(private readonly caseRepository: ICaseRepository) {}

  handle({ feederId, fields }: CaseListInput): Promise<CaseListOutput> {
    return this.caseRepository.findMany(feederId, fields);
  }
}
