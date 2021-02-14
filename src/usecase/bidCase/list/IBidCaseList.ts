import { BidCaseListInput } from "./BidCaseListInput";
import { BidCaseListOutput } from "./BidCaseListOutput";

export interface IBidCaseList {
  handle(props: BidCaseListInput): Promise<BidCaseListOutput>;
}
