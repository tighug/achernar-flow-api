import { Feeder } from "./Feeder";

export class Node {
  readonly id: number;
  readonly feeder: Feeder;
  readonly num: number;
  readonly posX: number;
  readonly posY: number;
  readonly hasLoad: boolean;

  constructor(props: Node) {
    this.id = props.id;
    this.feeder = props.feeder;
    this.num = props.num;
    this.posX = props.posX;
    this.posY = props.posY;
    this.hasLoad = props.hasLoad;
  }
}
