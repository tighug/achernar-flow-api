import { FeederListOutput } from "./FeederListOutput";

export interface IFeederList {
  handle(): Promise<FeederListOutput>;
}
