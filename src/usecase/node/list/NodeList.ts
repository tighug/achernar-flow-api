import { INodeRepository } from "../../../domain/repository/INodeRepository";
import { INodeList } from "./INodeList";
import { NodeListInput } from "./NodeListInput";
import { NodeListOutput } from "./NodeListOutput";

export class NodeList implements INodeList {
  constructor(private readonly nodeRepository: INodeRepository) {}

  handle({ feederId, fields }: NodeListInput): Promise<NodeListOutput> {
    return this.nodeRepository.findMany(feederId, fields);
  }
}
