import { ISampleRepository } from "../../../domain/repository/ISampleRepository";
import { ISampleListInteractor } from "./ISampleListInteractor";
import { SampleListInput } from "./SampleListInput";
import { SampleListOutput } from "./SampleListOutput";

export class SampleListInteractor implements ISampleListInteractor {
  constructor(private readonly sampleRepository: ISampleRepository) {}

  handle(input: SampleListInput): Promise<SampleListOutput> {
    switch (input.type) {
      case "load":
        return this.sampleRepository.findLoadsByTime(
          input.hour,
          input.minute,
          input.season
        );
      case "pv":
        return this.sampleRepository.findPVsByTime(
          input.hour,
          input.minute,
          input.season
        );
      case "ehp":
        return this.sampleRepository.findEHPsByTime(
          input.hour,
          input.minute,
          input.season
        );
      case "uchp":
        return this.sampleRepository.findUCHPsByTime(
          input.hour,
          input.minute,
          input.season
        );
      default:
        throw new Error("input.type is invalid.");
    }
  }
}
