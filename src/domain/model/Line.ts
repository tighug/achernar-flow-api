import { Feeder } from "./Feeder";
import { Joint } from "./Joint";

export class Line {
  readonly id: number;
  readonly feeder: Feeder;
  readonly prevJoint: Joint;
  readonly nextJoint: Joint;
  readonly lengthM: number;
  readonly hasLoad: boolean;
  readonly cableType: string;
  readonly rOhmPerKm: number;
  readonly zOhmPerKm: number;

  get zOhm(): number {
    return (this.zOhmPerKm * this.lengthM) / 1000;
  }

  constructor(props: Line) {
    this.id = props.id;
    this.feeder = props.feeder;
    this.prevJoint = props.prevJoint;
    this.nextJoint = props.nextJoint;
    this.lengthM = props.lengthM;
    this.hasLoad = props.hasLoad;
    this.cableType = props.cableType;
    this.rOhmPerKm = props.rOhmPerKm;
    this.zOhmPerKm = props.zOhmPerKm;
  }
}
