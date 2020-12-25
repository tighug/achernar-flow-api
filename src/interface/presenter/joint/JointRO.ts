import { Feeder } from "../../../domain/model/Feeder";

export type JointRO = {
  readonly joint: {
    readonly id: number;
    readonly feeder: Feeder;
    readonly num: number;
    readonly posX: number;
    readonly posY: number;
  };
};
