import { BidCaseGetInput } from "./BidCaseGetInput";
import { BidCaseGetOutput } from "./BidCaseGetOutput";

export interface IBidCaseGet {
  handle(props: BidCaseGetInput): Promise<BidCaseGetOutput>;
}
