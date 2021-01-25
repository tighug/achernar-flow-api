import { ICaseRepository } from "../../../domain/repository/ICaseRepository";
import { CaseDeleteInput } from "./CaseDeleteInput";
import { CaseDeleteOutput } from "./CaseDeleteOutput";
import { ICaseDelete } from "./ICaseDelete";

export class CaseDelete implements ICaseDelete {
  constructor(private readonly caseRepository: ICaseRepository) {}

  handle(props: CaseDeleteInput): Promise<CaseDeleteOutput> {
    return this.caseRepository.delete(props.id);
  }
}
