import { Feeder } from "../model/Feeder";
import { Joint } from "../model/Joint";

export interface IJointRepository {
  listByFeeder(feeder: Feeder): Promise<Joint[]>;
}
