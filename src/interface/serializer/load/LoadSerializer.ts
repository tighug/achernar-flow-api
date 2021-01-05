/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoadBaseRO } from "./LoadBaseRO";
import { LoadRO } from "./LoadRO";
import { LoadsRO } from "./LoadsRO";

export class LoadSerializer {
  serialize(data: any): LoadRO | LoadsRO {
    if (!data) throw new Error("data must not be undefined.");
    if (Array.isArray(data)) {
      const loads = data.map(this.serializeSingle);
      return {
        loadCount: loads.length,
        loads,
      };
    }
    return {
      load: this.serializeSingle(data),
    };
  }

  private serializeSingle(line: any): LoadBaseRO {
    return { ...line };
  }
}
