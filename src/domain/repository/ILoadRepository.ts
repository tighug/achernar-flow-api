import { DeepPartial } from "../model/DeepPartial";
import { Load } from "../model/Load";

export interface ILoadRepository {
  save(load: Load): Promise<Required<Load>>;
  findMany(
    props: { caseId: number; type: string },
    fields?: string[]
  ): Promise<DeepPartial<Load>[]>;
  deleteMany(caseId: number): Promise<void>;
}
