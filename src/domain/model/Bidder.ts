import { BidCase } from "./BidCase";
import { Node } from "./Node";

export class Bidder {
  id?: number;
  readonly bidCase: BidCase;
  readonly node: Node;
  readonly price: number;
  readonly volume: number;
  readonly type: string;

  constructor(props: Omit<Bidder, "id">) {
    this.bidCase = props.bidCase;
    this.node = props.node;
    this.price = props.price;
    this.volume = props.volume;
    this.type = props.type;
  }
}
