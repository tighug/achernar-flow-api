import { FeederBaseRO } from "../feeder/FeederBaseRO";

export type NodeBaseRO = {
  readonly id: number;
  readonly feeder: FeederBaseRO;
  readonly num: number;
  readonly posX: number;
  readonly posY: number;
};
