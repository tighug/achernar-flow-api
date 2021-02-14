import { DeepPartial } from "../model/DeepPartial";
import { Flow } from "../model/Flow";

export interface IFlowRepository {
  save(flow: Flow): Promise<Required<Flow>>;
  findMany(
    props: { caseId: number; type: string },
    fields?: string[]
  ): Promise<DeepPartial<Flow>[]>;
  deleteMany(caseId: number): Promise<void>;
}
