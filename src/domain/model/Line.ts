import { Feeder } from "./Feeder";
import { Node } from "./Node";

export class Line {
  readonly id: number;
  readonly feeder: Feeder;
  readonly prevNode: Node;
  readonly nextNode: Node;
  readonly lengthM: number;
  readonly phase: number;
  readonly code: string;
  readonly rOhmPerKm: number;
  readonly xOhmPerKm: number;

  constructor(props: Line) {
    this.id = props.id;
    this.feeder = props.feeder;
    this.prevNode = props.prevNode;
    this.nextNode = props.nextNode;
    this.lengthM = props.lengthM;
    this.phase = props.phase;
    this.code = props.code;
    this.rOhmPerKm = props.rOhmPerKm;
    this.xOhmPerKm = props.xOhmPerKm;
  }
}
