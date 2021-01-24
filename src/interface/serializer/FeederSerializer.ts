import { Feeder } from "../../domain/model/Feeder";

export class FeederSerializer {
  static serializeArray(models: Partial<Feeder>[]): FeedersRO {
    const feeders = models.map(this.serializeSingleFeeder);
    return {
      feederCount: feeders.length,
      feeders: feeders,
    };
  }

  private static serializeSingleFeeder(model: Partial<Feeder>): FeederBaseRO {
    return { ...model };
  }
}

export type FeederBaseRO = Readonly<
  Partial<{
    id: number;
    networkNum: number;
    feederNum: number;
  }>
>;

export type FeedersRO = {
  readonly feederCount: number;
  readonly feeders: FeederBaseRO[];
};
