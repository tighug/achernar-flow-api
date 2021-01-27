import { Flow } from "../model/Flow";

export interface IFlowRepository {
  save(flow: Flow): Promise<Flow>;
  findMany(props: {
    caseId: number;
    before: boolean;
    fields: string[];
  }): Promise<Partial<Flow>[]>;
  deleteMany(caseId: number): Promise<void>;
}
