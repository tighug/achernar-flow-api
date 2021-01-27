import { Case } from "./Case";
import { Node } from "./Node";

export class Load {
  id?: number;
  readonly case: Case;
  readonly node: Node;
  readonly val: number;
  readonly type: string;

  constructor(props: Omit<Load, "id">) {
    this.case = props.case;
    this.node = props.node;
    this.val = props.val;
    this.type = props.type;
  }
}
