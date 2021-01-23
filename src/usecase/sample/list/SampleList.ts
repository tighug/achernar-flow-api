import { ISampleRepository } from "../../../domain/repository/ISampleRepository";
import { ISampleList } from "./ISampleList";
import { SampleListInput } from "./SampleListInput";
import { SampleListOutput } from "./SampleListOutput";

export class SampleList implements ISampleList {
  constructor(private readonly sampleRepository: ISampleRepository) {}

  handle(props: SampleListInput): Promise<SampleListOutput> {
    return this.sampleRepository.findMany(props);
  }
}
