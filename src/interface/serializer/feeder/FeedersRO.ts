import { FeederBaseRO } from "./FeederBaseRO";

export type FeedersRO = {
  readonly feederCount: number;
  readonly feeders: FeederBaseRO[];
};
