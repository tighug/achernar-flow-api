import { Node } from "../../domain/model/Node";
import { FeederBaseRO } from "./FeederSerializer";

export class NodeSerializer {
  static serializeArray(models: Partial<Node>[]): NodesRO {
    const nodes = models.map(this.serializeSingle);
    return {
      nodeCount: nodes.length,
      nodes,
    };
  }

  private static serializeSingle(model: Partial<Node>): NodeBaseRO {
    return { ...model };
  }
}

export type NodeBaseRO = Readonly<
  Partial<{
    id: number;
    feeder: FeederBaseRO;
    num: number;
    posX: number;
    posY: number;
  }>
>;

export type NodesRO = Readonly<{
  nodeCount: number;
  nodes: NodeBaseRO[];
}>;
