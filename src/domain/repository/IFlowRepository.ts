import { Flow } from "../model/Flow";

export interface IFlowRepository {
  save(flow: Flow): Promise<Required<Flow>>;
  findMany(
    props: { caseId: number; before: boolean },
    fields?: string[]
  ): Promise<DeepPartial<Flow>[]>;
  deleteMany(caseId: number): Promise<void>;
}
