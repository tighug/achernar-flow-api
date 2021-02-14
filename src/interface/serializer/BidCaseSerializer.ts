import { BidCase } from "../../domain/model/BidCase";
import { DeepPartial } from "../../domain/model/DeepPartial";
import { CaseBaseRO } from "./CaseSerializer";

export class BidCaseSerializer {
  static serialize(model: DeepPartial<BidCase>): BidCaseRO {
    return { bidCase: this.serializeSingle(model) };
  }

  static serializeArray(models: DeepPartial<BidCase>[]): BidCasesRO {
    const bidCases = models.map(this.serializeSingle);
    return {
      bidCaseCount: bidCases.length,
      bidCases,
    };
  }

  private static serializeSingle(model: DeepPartial<BidCase>): BidCaseBaseRO {
    return { ...model };
  }
}

export type BidCaseBaseRO = Readonly<
  Partial<{
    id: number;
    case: CaseBaseRO;
    buyerCount: number;
    sellerCount: number;
    minBuyPrice: number;
    maxBuyPrice: number;
    minSellPrice: number;
    maxSellPrice: number;
    minBuyVolume: number;
    maxBuyVolume: number;
    minSellVolume: number;
    maxSellVolume: number;
    seed: number;
    status: string;
  }>
>;

export type BidCaseRO = Readonly<{
  bidCase: BidCaseBaseRO;
}>;

export type BidCasesRO = Readonly<{
  bidCaseCount: number;
  bidCases: BidCaseBaseRO[];
}>;
