import { LineListInput } from "./LineListInput";
import { LineListOutput } from "./LineListOutput";

export interface ILineList {
  handle(input: LineListInput): Promise<LineListOutput>;
}
