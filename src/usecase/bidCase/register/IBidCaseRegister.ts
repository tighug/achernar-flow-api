import { BidCaseRegisterInput } from "./BidCaseRegisterInput";
import { BidCaseRegisterOutput } from "./BidCaseRegisterOutput";

export interface IBidCaseRegister {
  handle(props: BidCaseRegisterInput): Promise<BidCaseRegisterOutput>;
}
