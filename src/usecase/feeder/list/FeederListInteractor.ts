import { IFeederRepository } from "../../../domain/repository/IFeederRepository";
import { FeederListOutputData } from "./FeederListOutputData";
import { IFeederListInteractor } from "./IFeederListInteractor";

export class FeederListInteractor implements IFeederListInteractor {
  constructor(private readonly feederRepository: IFeederRepository) {}

  async handle(): Promise<FeederListOutputData> {
    return this.feederRepository.findAll();
  }
}
