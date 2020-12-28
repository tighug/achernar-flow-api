import { FeederBaseRO } from "../feeder/FeederBaseRO";
import { NodeBaseRO } from "../node/NodeBaseRO";

export type LineBaseRO = {
  readonly id: number;
  readonly feeder: FeederBaseRO;
  readonly prevJoint: NodeBaseRO;
  readonly nextJoint: NodeBaseRO;
  readonly lengthM: number;
  readonly hasLoad: boolean;
  readonly code: string;
  readonly rOhmPerKm: number;
  readonly xOhmPerKm: number;
};
