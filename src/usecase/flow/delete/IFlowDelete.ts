import { FlowDeleteInput } from "./FlowDeleteInput";
import { FlowDeleteOutput } from "./FlowDeleteOutput";

export interface IFlowDelete {
  handle(props: FlowDeleteInput): Promise<FlowDeleteOutput>;
}
