import { IFeederRepository } from "../../../domain/repository/IFeederRepository";
import { FeederListInput } from "./FeederListInput";
import { FeederListOutput } from "./FeederListOutput";
import { IFeederList } from "./IFeederList";

export class FeederList implements IFeederList {
  constructor(private readonly feederRepository: IFeederRepository) {}

  handle({ fields }: FeederListInput): Promise<FeederListOutput> {
    return this.feederRepository.findAll(fields);
  }
}
