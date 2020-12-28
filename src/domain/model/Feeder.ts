export class Feeder {
  readonly id: number;
  readonly networkNum: number;
  readonly feederNum: number;

  constructor(props: Feeder) {
    this.id = props.id;
    this.networkNum = props.networkNum;
    this.feederNum = props.feederNum;
  }
}
