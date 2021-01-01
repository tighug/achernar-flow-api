import { Feeder } from "../model/Feeder";

export interface IFeederRepository {
  findAll(): Promise<Feeder[]>;
  find(id: number): Promise<Feeder | null>;
}
