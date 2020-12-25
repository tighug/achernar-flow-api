export type FeederRO = {
  readonly feeder: {
    readonly id: number;
    readonly networkNum: number;
    readonly feederNum: number;
    readonly jointCount: number;
    readonly houseCount: number;
  };
};
