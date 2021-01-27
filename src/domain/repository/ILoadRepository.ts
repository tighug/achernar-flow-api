import { Load } from "../model/Load";

export interface ILoadRepository {
  save(load: Load): Promise<Load>;
  findMany(props: {
    caseId: number;
    type: string;
    fields: string[];
  }): Promise<Partial<Load>[]>;
}
