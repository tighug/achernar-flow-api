import { Node } from "../model/Node";

export interface INodeRepository {
  findMany(props: {
    feederId: number;
    fields: string[];
  }): Promise<Partial<Node>[]>;
}
