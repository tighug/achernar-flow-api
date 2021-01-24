import { Feeder } from "../model/Feeder";

export interface IFeederRepository {
  findAll(props: { fields: string[] }): Promise<Partial<Feeder>[]>;
}
