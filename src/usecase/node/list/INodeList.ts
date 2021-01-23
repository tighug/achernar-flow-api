import { NodeListInput } from "./NodeListInput";
import { NodeListOutput } from "./NodeListOutput";

export interface INodeList {
  handle(props: NodeListInput): Promise<NodeListOutput>;
}
