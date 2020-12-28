import { INodeRepository } from "../../../domain/repository/INodeRepository";
import { INodeListInteractor } from "./INodeListInteractor";
import { NodeListInput } from "./NodeListInput";
import { NodeListOutput } from "./NodeListOutput";

export class NodeListInteractor implements INodeListInteractor {
  constructor(private readonly nodeRepository: INodeRepository) {}

  async handle(input: NodeListInput): Promise<NodeListOutput> {
    return this.nodeRepository.listByFeederId(input.feederId);
  }
}