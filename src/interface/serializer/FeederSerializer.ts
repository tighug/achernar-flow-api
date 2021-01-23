import { Feeder } from "../../domain/model/Feeder";

export class FeederSerializer {
  serializeArray(models: Feeder[]): FeedersRO {
    const feeders = models.map(this.serializeSingleFeeder);
    return {
      feederCount: feeders.length,
      feeders: feeders,
    };
  }

  private serializeSingleFeeder(model: Feeder): FeederBaseRO {
    return { ...model };
  }
}

export type FeederBaseRO = Readonly<{
  id: number;
  networkNum: number;
  feederNum: number;
}>;

export type FeedersRO = {
  readonly feederCount: number;
  readonly feeders: FeederBaseRO[];
};
