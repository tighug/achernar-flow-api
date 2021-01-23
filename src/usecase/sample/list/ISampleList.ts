import { SampleListInput } from "./SampleListInput";
import { SampleListOutput } from "./SampleListOutput";

export interface ISampleList {
  handle(input: SampleListInput): Promise<SampleListOutput>;
}
