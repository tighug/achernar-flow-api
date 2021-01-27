import { Node } from "./Node";

export class Load {
  readonly id?: number;
  readonly node: Node;
  readonly val: number;
  readonly type: string;

  constructor(props: Omit<Load, "id">) {
    this.node = props.node;
    this.val = props.val;
    this.type = props.type;
  }
}
