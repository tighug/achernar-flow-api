import { BidCase } from "./BidCase";
import { Node } from "./Node";

export class NodalPrice {
  id?: number;
  readonly bidCase: BidCase;
  readonly node: Node;
  muIp = 0;
  muIn = 0;
  muVp = 0;
  muVn = 0;
  value = 0;

  constructor(props: { bidCase: BidCase; node: Node }) {
    this.bidCase = props.bidCase;
    this.node = props.node;
  }
}
