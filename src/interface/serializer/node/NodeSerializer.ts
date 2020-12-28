/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NodeBaseRO } from "./NodeBaseRO";
import { NodeRO } from "./NodeRO";
import { NodesRO } from "./NodesRO";

export class NodeSerializer {
  serialize(data: any): NodeRO | NodesRO {
    if (!data) throw new Error("data must not be undefined.");
    if (Array.isArray(data)) {
      const nodes = data.map(this.serializeSingleNode);
      return {
        nodeCount: nodes.length,
        nodes,
      };
    }
    return {
      node: this.serializeSingleNode(data),
    };
  }

  private serializeSingleNode(node: any): NodeBaseRO {
    return { ...node };
  }
}
