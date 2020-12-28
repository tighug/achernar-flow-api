import { Feeder } from "../../../domain/model/Feeder";

export type NodeRO = {
  readonly node: {
    readonly id: number;
    readonly feeder: Feeder;
    readonly num: number;
    readonly posX: number;
    readonly posY: number;
  };
};
