import { DeepPartial } from "../../domain/model/DeepPartial";
import { NodalPrice } from "../../domain/model/NodalPrice";
import { BidCaseBaseRO } from "./BidCaseSerializer";
import { NodeBaseRO } from "./NodeSerializer";

export class NodalPriceSerializer {
  static serializeArray(models: DeepPartial<NodalPrice>[]): NodalPricesRO {
    const nodalPrices = models.map(this.serializeSingle);
    return {
      nodalPriceCount: nodalPrices.length,
      nodalPrices,
    };
  }

  private static serializeSingle(
    model: DeepPartial<NodalPrice>
  ): NodalPriceBaseRO {
    return { ...model };
  }
}

export type NodalPriceBaseRO = Readonly<
  Partial<{
    id: number;
    bidCase: BidCaseBaseRO;
    node: NodeBaseRO;
    muIp: number;
    muIn: number;
    muVp: number;
    muVn: number;
    value: number;
  }>
>;

export type NodalPricesRO = Readonly<{
  nodalPriceCount: number;
  nodalPrices: NodalPriceBaseRO[];
}>;
