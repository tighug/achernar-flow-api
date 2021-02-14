import { BidCaseQueueInput } from "./BidCaseQueueInput";
import { BidCaseQueueOutput } from "./BidCaseQueueOutput";

export interface IBidCaseQueue {
  handle(props: BidCaseQueueInput): Promise<BidCaseQueueOutput>;
}
