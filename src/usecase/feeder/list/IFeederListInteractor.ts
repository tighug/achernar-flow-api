import { FeederListOutput } from "./FeederListOutput";

export interface IFeederListInteractor {
  handle(): Promise<FeederListOutput>;
}
