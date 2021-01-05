import { IFeederRepository } from "../../../domain/repository/IFeederRepository";
import { FeederListOutput } from "./FeederListOutput";
import { IFeederListInteractor } from "./IFeederListInteractor";

export class FeederListInteractor implements IFeederListInteractor {
  constructor(private readonly feederRepository: IFeederRepository) {}

  handle(): Promise<FeederListOutput> {
    return this.feederRepository.findAll();
  }
}
