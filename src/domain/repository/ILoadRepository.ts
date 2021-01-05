import { Load } from "../model/Load";

export interface ILoadRepository {
  listByTime(hour: number, minute: number, season: string): Promise<Load[]>;
}
