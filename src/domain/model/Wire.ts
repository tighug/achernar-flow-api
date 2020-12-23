export class Wire {
  readonly id: number;
  readonly feederId: number;
  readonly prevJointId: number;
  readonly nextJointId: number;
  readonly lenthM: number;
  readonly hasLoad: boolean;
  readonly cableType: string;
  readonly rOhmPerKm: number;
  readonly zOhmPerKm: number;

  get zOhm(): number {
    return (this.zOhmPerKm * this.lenthM) / 1000;
  }

  constructor(props: Wire) {
    this.id = props.id;
    this.feederId = props.feederId;
    this.prevJointId = props.prevJointId;
    this.nextJointId = props.nextJointId;
    this.lenthM = props.lenthM;
    this.hasLoad = props.hasLoad;
    this.cableType = props.cableType;
    this.rOhmPerKm = props.rOhmPerKm;
    this.zOhmPerKm = props.zOhmPerKm;
  }
}
