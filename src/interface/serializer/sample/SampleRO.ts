export type SampleBaseRO = {
  readonly id: number;
  readonly num: number;
  readonly hour: number;
  readonly minute: number;
  readonly val: number;
  readonly season: string;
};

export type SampleRO = {
  sample: SampleBaseRO;
};

export type SamplesRO = {
  sampleCount: number;
  samples: SampleBaseRO[];
};
