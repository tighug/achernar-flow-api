import { Line } from "../model/Line";

export interface ILineRepository {
  findByFeederId(feederId: number): Promise<Line[]>;
}
