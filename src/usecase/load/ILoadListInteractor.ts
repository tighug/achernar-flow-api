import { LoadListInput } from "./LoadListInput";
import { LoadListOutput } from "./LoadListOutput";

export interface ILoadListInteractor {
  handle(input: LoadListInput): Promise<LoadListOutput>;
}
