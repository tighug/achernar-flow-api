import { Feeder } from "../model/Feeder";

export interface IFeederRepository {
  findAll(): Promise<Feeder[]>;
  findOne(id: number): Promise<Feeder | null>;
}
