import { Bidder } from "../model/Bidder";
import { DeepPartial } from "../model/DeepPartial";

export interface IBidderRepository {
  save(bidder: Bidder): Promise<Required<Bidder>>;
  findMany(
    props: { bidCaseId: number; type?: string },
    fields?: string[]
  ): Promise<DeepPartial<Bidder>[]>;
}
