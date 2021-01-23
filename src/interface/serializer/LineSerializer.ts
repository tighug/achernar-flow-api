import { Line } from "../../domain/model/Line";
import { NodeBaseRO } from "./NodeSerializer";

export class LineSerializer {
  serializeArray(models: Line[]): LinesRO {
    const lines = models.map(this.serializeSingle);
    return {
      lineCount: lines.length,
      lines,
    };
  }

  private serializeSingle(line: Line): LineBaseRO {
    return { ...line };
  }
}

export type LineBaseRO = Readonly<{
  id: number;
  prevNode: NodeBaseRO;
  nextNode: NodeBaseRO;
  lengthM: number;
  phase: number;
  code: string;
  rOhmPerKm: number;
  xOhmPerKm: number;
}>;

export type LinesRO = Readonly<{
  lineCount: number;
  lines: LineBaseRO[];
}>;
