import { BidCaseDeleteInput } from "./BidCaseDeleteInput";
import { BidCaseDeleteOutput } from "./BidCaseDeleteOutput";

export interface IBidCaseDelete {
  handle(props: BidCaseDeleteInput): Promise<BidCaseDeleteOutput>;
}
