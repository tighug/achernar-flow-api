import { IFeederRepository } from "../../../domain/repository/IFeederRepository";
import { FeederListOutput } from "./FeederListOutput";
import { IFeederList } from "./IFeederList";

export class FeederList implements IFeederList {
  constructor(private readonly feederRepository: IFeederRepository) {}

  handle(): Promise<FeederListOutput> {
    return this.feederRepository.findAll();
  }
}
