import { ILoadRepository } from "../../../domain/repository/ILoadRepository";
import { ILoadDelete } from "./ILoadDelete";
import { LoadDeleteInput } from "./LoadDeleteInput";
import { LoadDeleteOutput } from "./LoadDeleteOutput";

export class LoadDelete implements ILoadDelete {
  constructor(private readonly loadRepository: ILoadRepository) {}

  handle({ caseId }: LoadDeleteInput): Promise<LoadDeleteOutput> {
    return this.loadRepository.deleteMany(caseId);
  }
}
