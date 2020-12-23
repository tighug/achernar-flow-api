import { LineListOutputData } from "./LineListOutputData";

export interface ILineListInteractor {
  handle(feederId: number): Promise<LineListOutputData>;
}
