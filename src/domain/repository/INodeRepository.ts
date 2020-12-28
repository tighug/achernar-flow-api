import { Node } from "../model/Node";

export interface INodeRepository {
  listByFeederId(feederId: number): Promise<Node[]>;
}
