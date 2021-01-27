import { Case } from "../model/Case";

export interface ICaseRepository {
  save(c: Case): Promise<Required<Case>>;
  findOne(id: number, fields?: string[]): Promise<Partial<Case> | null>;
  findMany(feederId: number, fields?: string[]): Promise<Partial<Case>[]>;
  update(id: number, status: string): Promise<Required<Case>>;
  delete(id: number): Promise<void>;
}
