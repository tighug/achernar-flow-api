import { Case } from "./Case";

export class BidCase {
  id?: number;
  readonly case: Case;
  readonly buyerCount: number;
  readonly sellerCount: number;
  readonly minBuyPrice: number;
  readonly maxBuyPrice: number;
  readonly minSellPrice: number;
  readonly maxSellPrice: number;
  readonly minBuyVolume: number;
  readonly maxBuyVolume: number;
  readonly minSellVolume: number;
  readonly maxSellVolume: number;
  readonly seed: number;
  status = "waiting";

  constructor(props: Omit<BidCase, "id" | "status">) {
    this.case = props.case;
    this.buyerCount = props.buyerCount;
    this.sellerCount = props.sellerCount;
    this.minBuyPrice = props.minBuyPrice;
    this.maxBuyPrice = props.maxBuyPrice;
    this.minSellPrice = props.minSellPrice;
    this.maxSellPrice = props.maxSellPrice;
    this.minBuyVolume = props.minBuyVolume;
    this.maxBuyVolume = props.maxBuyVolume;
    this.minSellVolume = props.minSellVolume;
    this.maxSellVolume = props.maxSellVolume;
    this.seed = props.seed;
  }
}
