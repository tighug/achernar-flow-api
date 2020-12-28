import { NodeListInput } from "./NodeListInput";
import { NodeListOutput } from "./NodeListOutput";

export interface INodeListInteractor {
  handle(input: NodeListInput): Promise<NodeListOutput>;
}
