import { Node } from "../../../domain/model/Node";
import { NodeRO } from "./NodeRO";
import { NodesRO } from "./NodesRO";

export class NodePresenter {
  serialize(node: Node): NodeRO {
    return {
      node: this.toJson(node),
    };
  }

  serializeArray(nodes: Node[]): NodesRO {
    const modNodes = nodes.map(this.toJson);
    return {
      nodeCount: modNodes.length,
      nodes: modNodes,
    };
  }

  private toJson(node: Node) {
    return node;
  }
}
