/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SampleBaseRO, SampleRO, SamplesRO } from "./SampleRO";

export class SampleSerializer {
  serialize(data: any): SampleRO | SamplesRO {
    if (!data) throw new Error("data must not be undefined.");
    if (Array.isArray(data)) {
      const loads = data.map(this.serializeSingle);
      return {
        sampleCount: loads.length,
        samples: loads,
      };
    }
    return {
      sample: this.serializeSingle(data),
    };
  }

  private serializeSingle(line: any): SampleBaseRO {
    return { ...line };
  }
}
