import { BidCase } from "../model/BidCase";
import { DeepPartial } from "../model/DeepPartial";

export interface IBidCaseRepository {
  save(bidCase: BidCase): Promise<Required<BidCase>>;
  findOne(id: number, fields?: string[]): Promise<DeepPartial<BidCase> | null>;
  findMany(caseId: number, fields?: string[]): Promise<DeepPartial<BidCase>[]>;
  update(id: number, status: string): Promise<Required<BidCase>>;
  delete(id: number): Promise<void>;
}
