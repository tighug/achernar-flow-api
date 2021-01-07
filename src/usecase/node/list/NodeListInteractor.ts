import { INodeRepository } from "../../../domain/repository/INodeRepository";
import { INodeListInteractor } from "./INodeListInteractor";
import { NodeListInput } from "./NodeListInput";
import { NodeListOutput } from "./NodeListOutput";

export class NodeListInteractor implements INodeListInteractor {
  constructor(private readonly nodeRepository: INodeRepository) {}

  handle(input: NodeListInput): Promise<NodeListOutput> {
    return this.nodeRepository.findByFeederId(input.feederId);
  }
}
