export class Feeder {
  readonly id: number;
  readonly networkNum: number;
  readonly nodeNum: number;
  readonly jointCount: number;
  readonly houseCount: number;

  constructor(props: Feeder){
    this.id = props.id;
    this.networkNum =props.networkNum;
    this.nodeNum = props.nodeNum;
    this.jointCount = props.jointCount;
    this.houseCount = props.houseCount;
  }
}