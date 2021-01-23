import { Sample } from "../model/Sample";

export interface ISampleRepository {
  findMany(props: {
    hour: number;
    minute: number;
    season: string;
    type: string;
    fields: string[];
  }): Promise<Partial<Sample>[]>;
}
