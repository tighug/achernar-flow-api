import { LineBaseRO } from "./LineBaseRO";

export type LinesRO = {
  readonly lineCount: number;
  readonly lines: LineBaseRO[];
};
