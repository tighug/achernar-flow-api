import { Node } from "../model/Node";

export interface INodeRepository {
  findMany(feederId: number, fields?: string[]): Promise<Partial<Node>[]>;
}
