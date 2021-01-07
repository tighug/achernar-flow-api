import { Node } from "../model/Node";

export interface INodeRepository {
  findByFeederId(feederId: number): Promise<Node[]>;
}
