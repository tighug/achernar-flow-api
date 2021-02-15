import { Case } from "./Case";
import { Line } from "./Line";

export class Flow {
  id?: number;
  readonly case: Case;
  readonly line: Line;
  nextNodeP: number;
  nextNodeV: number;
  lineI = 0;
  type = "before";
  bidCaseId = 0; // To filter only

  constructor(props: Omit<Flow, "type" | "lineI" | "bidCaseId">) {
    this.case = props.case;
    this.line = props.line;
    this.nextNodeV = props.nextNodeV;
    this.nextNodeP = props.nextNodeP;
  }
}
