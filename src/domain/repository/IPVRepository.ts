import { PV } from "../model/PV";

export interface IPVRepository {
  listByTime(hour: number, minute: number): Promise<PV[]>;
}
