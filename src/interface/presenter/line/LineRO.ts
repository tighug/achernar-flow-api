import { Feeder } from "../../../domain/model/Feeder";
import { Node } from "../../../domain/model/Node";

export type LineRO = {
  readonly line: {
    readonly id: number;
    readonly feeder: Feeder;
    readonly prevJoint: Node;
    readonly nextJoint: Node;
    readonly lengthM: number;
    readonly hasLoad: boolean;
    readonly cableType: string;
    readonly rOhmPerKm: number;
    readonly zOhmPerKm: number;
  };
};
