import createHttpError from "http-errors";
import { ICaseRepository } from "../../../domain/repository/ICaseRepository";
import { CaseDeleteInput } from "./CaseDeleteInput";
import { CaseDeleteOutput } from "./CaseDeleteOutput";
import { ICaseDelete } from "./ICaseDelete";

export class CaseDelete implements ICaseDelete {
  constructor(private readonly caseRepository: ICaseRepository) {}

  async handle({ id }: CaseDeleteInput): Promise<CaseDeleteOutput> {
    if ((await this.caseRepository.findOne({ id, fields: [] })) === null)
      throw new createHttpError.NotFound("Not Found.");

    return this.caseRepository.delete(id);
  }
}
