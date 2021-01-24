import { FeederListInput } from "./FeederListInput";
import { FeederListOutput } from "./FeederListOutput";

export interface IFeederList {
  handle(props: FeederListInput): Promise<FeederListOutput>;
}
