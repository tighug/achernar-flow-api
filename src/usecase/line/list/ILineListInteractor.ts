import { LineListInput } from "./LineListInput";
import { LineListOutput } from "./LineListOutput";

export interface ILineListInteractor {
  handle(input: LineListInput): Promise<LineListOutput>;
}
