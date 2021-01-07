import { SampleListInput } from "./SampleListInput";
import { SampleListOutput } from "./SampleListOutput";

export interface ISampleListInteractor {
  handle(input: SampleListInput): Promise<SampleListOutput>;
}
