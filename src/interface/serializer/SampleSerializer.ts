import { Sample } from "../../domain/model/Sample";

export class SampleSerializer {
  serializeArray(models: Sample[]): SamplesRO {
    const samples = models.map(this.serializeSingle);
    return {
      sampleCount: samples.length,
      samples: samples,
    };
  }

  private serializeSingle(model: Sample): SampleBaseRO {
    return { ...model };
  }
}

export type SampleBaseRO = Readonly<{
  id: number;
  num: number;
  hour: number;
  minute: number;
  val: number;
  season: string;
  type: string;
}>;

export type SamplesRO = {
  sampleCount: number;
  samples: SampleBaseRO[];
};
