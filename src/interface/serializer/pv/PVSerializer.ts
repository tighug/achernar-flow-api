/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PVBaseRO } from "./PVBaseRO";
import { PVRO } from "./PVRO";
import { PVsRO } from "./PVsRO";

export class PVSerializer {
  serialize(data: any): PVRO | PVsRO {
    if (!data) throw new Error("data must not be undefined.");
    if (Array.isArray(data)) {
      const pvs = data.map(this.serializeSingle);
      return {
        pvCount: pvs.length,
        pvs,
      };
    }
    return {
      pv: this.serializeSingle(data),
    };
  }

  private serializeSingle(pv: any): PVBaseRO {
    return { ...pv };
  }
}
