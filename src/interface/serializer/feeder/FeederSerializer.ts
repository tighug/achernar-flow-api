/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FeederBaseRO } from "./FeederBaseRO";
import { FeederRO } from "./FeederRO";
import { FeedersRO } from "./FeedersRO";

export class FeederSerializer {
  serialize(data: any): FeederRO | FeedersRO {
    if (!data) throw new Error("data must not be undefined.");
    if (Array.isArray(data)) {
      const feeders = data.map(this.serializeSingleFeeder);
      return {
        feederCount: feeders.length,
        feeders,
      };
    }
    return {
      feeder: this.serializeSingleFeeder(data),
    };
  }

  private serializeSingleFeeder(feeder: any): FeederBaseRO {
    return { ...feeder };
  }
}
