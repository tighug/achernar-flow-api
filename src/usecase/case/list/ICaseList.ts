import { CaseListInput } from "./CaseListInput";
import { CaseListOutput } from "./CaseListOutput";

export interface ICaseList {
  handle(props: CaseListInput): Promise<CaseListOutput>;
}
