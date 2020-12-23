import { FeederListOutputData } from "./FeederListOutputData";

export interface IFeederListInteractor {
  handle(): Promise<FeederListOutputData>;
}
