import { Feeder } from "../../../domain/model/Feeder";
import { FeederRO } from "./FeederRO";
import { FeedersRO } from "./FeedersRO";

export class FeederPresenter {
  serialize(feeder: Feeder): FeederRO {
    return {
      feeder: this.toJson(feeder),
    };
  }

  serializeArray(feeders: Feeder[]): FeedersRO {
    const modFeeders = feeders.map(this.toJson);
    return {
      feederCount: modFeeders.length,
      feeders: modFeeders,
    };
  }

  private toJson(feeder: Feeder) {
    return feeder;
  }
}
