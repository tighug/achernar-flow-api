import { Case } from "./Case";
import { Line } from "./Line";

export class Flow {
  readonly id?: number;
  readonly case: Case;
  readonly line: Line;
  nextNodeP: number;
  nextNodeV: number;
  lineI = 0;
  before = true;

  constructor(props: Omit<Flow, "before" | "lineI">) {
    this.case = props.case;
    this.line = props.line;
    this.nextNodeV = props.nextNodeV;
    this.nextNodeP = props.nextNodeP;
  }
}
