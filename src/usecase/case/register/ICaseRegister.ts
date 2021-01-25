import { CaseRegisterInput } from "./CaseRegisterInput";
import { CaseRegisterOutput } from "./CaseRegisterOutput";

export interface ICaseRegister {
  handle(props: CaseRegisterInput): Promise<CaseRegisterOutput>;
}
