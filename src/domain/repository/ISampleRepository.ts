import { Sample } from "../model/Sample";

export interface ISampleRepository {
  findMany(props: {
    hour: number;
    minute: number;
    season: string;
    type: string;
  }): Promise<Sample[]>;
}
