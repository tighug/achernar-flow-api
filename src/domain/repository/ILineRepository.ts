import { Line } from "../model/Line";

export interface ILineRepository {
  findMany(props: {
    feederId: number;
    fields: string[];
  }): Promise<Partial<Line>[]>;
}
