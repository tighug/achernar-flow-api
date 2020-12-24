import { Feeder } from "../model/Feeder";
import { Line } from "../model/Line";

export interface ILineRepository {
  listByFeeder(Feeder: Feeder): Promise<Line[]>;
}
