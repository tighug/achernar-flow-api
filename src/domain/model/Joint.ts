export class Joint {
  readonly id: number;
  readonly feederId: number;
  readonly num: number;
  readonly posX: number;
  readonly posY: number;

  constructor(props: Joint){
    this.id = props.id;
    this.feederId =props.feederId
    this.num =props.num;
    this.posX = props.posX;
    this.posY = props.posY;
  }
}