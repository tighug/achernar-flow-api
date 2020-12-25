export type FeedersRO = {
  readonly feederCount: number;
  readonly feeders: {
    readonly id: number;
    readonly networkNum: number;
    readonly feederNum: number;
    readonly jointCount: number;
    readonly houseCount: number;
  }[];
};
