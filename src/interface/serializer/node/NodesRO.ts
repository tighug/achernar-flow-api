import { NodeBaseRO } from "./NodeBaseRO";

export type NodesRO = {
  readonly nodeCount: number;
  readonly nodes: NodeBaseRO[];
};
