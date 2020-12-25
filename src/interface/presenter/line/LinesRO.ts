import { Feeder } from "../../../domain/model/Feeder";
import { Joint } from "../../../domain/model/Joint";

export type LinesRO = {
  readonly lineCount: number;
  readonly lines: {
    readonly id: number;
    readonly feeder: Feeder;
    readonly prevJoint: Joint;
    readonly nextJoint: Joint;
    readonly lengthM: number;
    readonly hasLoad: boolean;
    readonly cableType: string;
    readonly rOhmPerKm: number;
    readonly zOhmPerKm: number;
  }[];
};
