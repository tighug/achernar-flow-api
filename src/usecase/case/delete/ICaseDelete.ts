import { CaseDeleteInput } from "./CaseDeleteInput";
import { CaseDeleteOutput } from "./CaseDeleteOutput";

export interface ICaseDelete {
  handle(props: CaseDeleteInput): Promise<CaseDeleteOutput>;
}
