import { Line } from "../model/Line";

export interface ILineRepository {
  listByFeederId(feederId: number): Promise<Line[]>;
}
