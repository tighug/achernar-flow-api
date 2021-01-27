import { Case } from "../model/Case";

export interface ICaseRepository {
  save(c: Case): Promise<Required<Case>>;
  findOne(props: {
    id: number;
    fields: string[];
  }): Promise<Partial<Case> | null>;
  findMany(props: {
    feederId: number;
    fields: string[];
  }): Promise<Partial<Case>[]>;
  update(props: { id: number; status: string }): Promise<Case>;
  delete(id: number): Promise<void>;
}
