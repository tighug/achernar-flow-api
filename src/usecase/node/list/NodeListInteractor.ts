import { INodeRepository } from "../../../domain/repository/INodeRepository";
import { INodeListInteractor } from "./INodeListInteractor";
import { NodeListOutputData } from "./NodeListOutputData";

export class NodeListInteractor implements INodeListInteractor {
  constructor(private readonly nodeRepository: INodeRepository) {}

  async handle(feederId: number): Promise<NodeListOutputData> {
    return this.nodeRepository.listByFeederId(feederId);
  }
}
