import { IFlowRepository } from "../../../domain/repository/IFlowRepository";
import { FlowListInput } from "./FlowListInput";
import { FlowListOutput } from "./FlowListOutput";
import { IFlowList } from "./IFlowList";

export class FlowList implements IFlowList {
  constructor(private readonly flowRepository: IFlowRepository) {}

  handle(props: FlowListInput): Promise<FlowListOutput> {
    return this.flowRepository.findMany(props);
  }
}
