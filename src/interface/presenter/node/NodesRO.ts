import { Feeder } from "../../../domain/model/Feeder";

export type NodesRO = {
  readonly nodeCount: number;
  readonly nodes: {
    readonly id: number;
    readonly feeder: Feeder;
    readonly num: number;
    readonly posX: number;
    readonly posY: number;
  }[];
};
