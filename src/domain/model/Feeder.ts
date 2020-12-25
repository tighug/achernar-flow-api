export class Feeder {
  readonly id: number;
  readonly networkNum: number;
  readonly feederNum: number;
  readonly jointCount: number;
  readonly houseCount: number;

  constructor(props: Feeder) {
    this.id = props.id;
    this.networkNum = props.networkNum;
    this.feederNum = props.feederNum;
    this.jointCount = props.jointCount;
    this.houseCount = props.houseCount;
  }
}
