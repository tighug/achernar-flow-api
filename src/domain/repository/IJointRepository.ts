import { Joint } from "../model/Joint";

export interface IJointRepository {
  listByFeederId(feederId: number): Promise<Joint[]>;
}
