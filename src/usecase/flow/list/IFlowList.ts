import { FlowListInput } from "./FlowListInput";
import { FlowListOutput } from "./FlowListOutput";

export interface IFlowList {
  handle(props: FlowListInput): Promise<FlowListOutput>;
}
