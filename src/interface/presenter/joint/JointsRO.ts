import { Feeder } from "../../../domain/model/Feeder";

export type JointsRO = {
  readonly jointCount: number;
  readonly joints: {
    readonly id: number;
    readonly feeder: Feeder;
    readonly num: number;
    readonly posX: number;
    readonly posY: number;
  }[];
};
