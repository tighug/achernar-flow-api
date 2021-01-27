import { Line } from "../model/Line";

export interface ILineRepository {
  findMany(feederId: number, fields?: string[]): Promise<DeepPartial<Line>[]>;
}
