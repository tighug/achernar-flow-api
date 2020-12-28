/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { LineBaseRO } from "./LineBaseRO";
import { LineRO } from "./LineRO";
import { LinesRO } from "./LinesRO";

export class LineSerializer {
  serialize(data: any): LineRO | LinesRO {
    if (!data) throw new Error("data must not be undefined.");
    if (Array.isArray(data)) {
      const lines = data.map(this.serializeSingleLine);
      return {
        lineCount: lines.length,
        lines,
      };
    }
    return {
      line: this.serializeSingleLine(data),
    };
  }

  private serializeSingleLine(line: any): LineBaseRO {
    return { ...line };
  }
}
