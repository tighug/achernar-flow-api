import { Feeder } from "./Feeder";

export class Joint {
  readonly id: number;
  readonly feeder: Feeder;
  readonly num: number;
  readonly posX: number;
  readonly posY: number;

  constructor(props: Joint) {
    this.id = props.id;
    this.feeder = props.feeder;
    this.num = props.num;
    this.posX = props.posX;
    this.posY = props.posY;
  }
}
