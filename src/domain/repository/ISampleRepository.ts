import { Sample, SampleType, Season } from "../model/Sample";

export interface ISampleRepository {
  findMany(props: {
    hour: number;
    minute: number;
    season: Season;
    type: SampleType;
  }): Promise<Sample[]>;
}
