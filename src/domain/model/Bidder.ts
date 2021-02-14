import { BidCase } from "./BidCase";
import { Node } from "./Node";

export class Bidder {
  id?: number;
  readonly bidCase: BidCase;
  readonly node: Node;
  readonly price: number;
  readonly volume: number;
  readonly type: string;
  agreed = 0;

  constructor(props: Omit<Bidder, "id" | "agreed">) {
    this.bidCase = props.bidCase;
    this.node = props.node;
    this.price = props.price;
    this.volume = props.volume;
    this.type = props.type;
  }
}
