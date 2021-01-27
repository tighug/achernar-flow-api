import { IFlowRepository } from "../../../domain/repository/IFlowRepository";
import { FlowDeleteInput } from "./FlowDeleteInput";
import { FlowDeleteOutput } from "./FlowDeleteOutput";
import { IFlowDelete } from "./IFlowDelete";

export class FlowDelete implements IFlowDelete {
  constructor(private readonly flowRepository: IFlowRepository) {}

  handle(props: FlowDeleteInput): Promise<FlowDeleteOutput> {
    return this.flowRepository.deleteMany(props.caseId);
  }
}
