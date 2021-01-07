import { Sample } from "../model/Sample";

export interface ISampleRepository {
  findLoadsByTime(
    hour: number,
    minute: number,
    season: string
  ): Promise<Sample[]>;
  findPVsByTime(
    hour: number,
    minute: number,
    season: string
  ): Promise<Sample[]>;
  findEHPsByTime(
    hour: number,
    minute: number,
    season: string
  ): Promise<Sample[]>;
  findUCHPsByTime(
    hour: number,
    minute: number,
    season: string
  ): Promise<Sample[]>;
}
