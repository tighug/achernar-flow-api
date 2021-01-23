import { Node } from "../model/Node";

export interface INodeRepository {
  findMany(props: { feederId: number }): Promise<Node[]>;
}
