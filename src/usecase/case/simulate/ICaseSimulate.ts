import { CaseSimulateInput } from "./CaseSimulateInput";
import { CaseSimulateOutput } from "./CaseSimulateOutput";

export interface ICaseSimulate {
  handle(props: CaseSimulateInput): Promise<CaseSimulateOutput>;
}
