import { ILoadRepository } from "../../domain/repository/ILoadRepository";
import { ILoadListInteractor } from "./ILoadListInteractor";
import { LoadListInput } from "./LoadListInput";
import { LoadListOutput } from "./LoadListOutput";

export class LoadListInteractor implements ILoadListInteractor {
  constructor(private readonly loadRepository: ILoadRepository) {}

  handle(input: LoadListInput): Promise<LoadListOutput> {
    return this.loadRepository.listByTime(
      input.hour,
      input.minute,
      input.season
    );
  }
}
