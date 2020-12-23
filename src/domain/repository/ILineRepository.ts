import { Line } from "../model/Line";

export interface ILineRepository {
  listByFeeder(id: number): Promise<Line[]>;
}
