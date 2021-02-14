export type BidCaseRegisterInput = Readonly<{
  caseId: number;
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
}>;
