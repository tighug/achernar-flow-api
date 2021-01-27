import { Feeder } from "../model/Feeder";

export interface IFeederRepository {
  findOne(id: number, fields?: string[]): Promise<Partial<Feeder> | null>;
  findAll(fields?: string[]): Promise<Partial<Feeder>[]>;
}
