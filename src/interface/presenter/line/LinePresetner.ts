import { Line } from "../../../domain/model/Line";
import { LineRO } from "./LineRO";
import { LinesRO } from "./LinesRO";

export class LinePresenter {
  serialize(line: Line): LineRO {
    return {
      line: this.toJson(line),
    };
  }

  serializeArray(lines: Line[]): LinesRO {
    return {
      lineCount: lines.length,
      lines: lines.map(this.toJson),
    };
  }

  private toJson(lines: Line) {
    return lines;
  }
}
