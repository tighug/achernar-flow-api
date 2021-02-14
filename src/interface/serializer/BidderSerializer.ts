import { Bidder } from "../../domain/model/Bidder";
import { DeepPartial } from "../../domain/model/DeepPartial";
import { NodeBaseRO } from "./NodeSerializer";
import { BidCaseBaseRO } from "./BidCaseSerializer";

export class BidderSerializer {
  static serializeArray(models: DeepPartial<Bidder>[]): BiddersRO {
    const bidders = models.map(this.serializeSingle);
    return {
      bidderCount: bidders.length,
      bidders,
    };
  }

  private static serializeSingle(model: DeepPartial<Bidder>): BidderBaseRO {
    return { ...model };
  }
}

export type BidderBaseRO = Readonly<
  Partial<{
    id: number;
    bidCase: BidCaseBaseRO;
    node: NodeBaseRO;
    price: number;
    volume: number;
    agreed: number;
    type: string;
  }>
>;

export type BiddersRO = Readonly<{
  bidderCount: number;
  bidders: BidderBaseRO[];
}>;
