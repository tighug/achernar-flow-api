import { BidderListInput } from "./BidderListInput";
import { BidderListOutput } from "./BidderListOutput";

export interface IBidderList {
  handle(props: BidderListInput): Promise<BidderListOutput>;
}
