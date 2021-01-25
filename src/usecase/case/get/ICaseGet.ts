import { CaseGetInput } from "./CaseGetInput";
import { CaseGetOutput } from "./CaseGetOutput";

export interface ICaseGet {
  handle(props: CaseGetInput): Promise<CaseGetOutput>;
}
