import { Sample } from "../../domain/model/Sample";

export class SampleSerializer {
  static serializeArray(models: Partial<Sample>[]): SamplesRO {
    const samples = models.map(this.serializeSingle);
    return {
      sampleCount: samples.length,
      samples: samples,
    };
  }

  private static serializeSingle(model: Partial<Sample>): SampleBaseRO {
    return { ...model };
  }
}

export type SampleBaseRO = Readonly<
  Partial<{
    id: number;
    num: number;
    hour: number;
    minute: number;
    val: number;
    season: string;
    type: string;
  }>
>;

export type SamplesRO = {
  sampleCount: number;
  samples: SampleBaseRO[];
};
