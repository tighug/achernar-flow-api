import { IJointRepository } from "../../../domain/repository/IJointRepository";
import { IJointListInteractor } from "./IJointListInteractor";
import { JointListOutputData } from "./JointListOutputData";

export class JointListInteractor implements IJointListInteractor {
  constructor(private readonly jointRepository: IJointRepository) {}

  async handle(feederId: number): Promise<JointListOutputData> {
    return this.jointRepository.listByFeederId(feederId);
  }
}
