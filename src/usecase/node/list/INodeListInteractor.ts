import { NodeListOutputData } from "./NodeListOutputData";

export interface INodeListInteractor {
  handle(feederId: number): Promise<NodeListOutputData>;
}
