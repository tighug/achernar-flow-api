import { Feeder } from "../model/Feeder";

export interface IFeederRepository {
  findOne(props: {
    id: number;
    fields: string[];
  }): Promise<Partial<Feeder> | null>;
  findAll(props: { fields: string[] }): Promise<Partial<Feeder>[]>;
}
