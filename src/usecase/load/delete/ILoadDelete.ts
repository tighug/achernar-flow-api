import { LoadDeleteInput } from "./LoadDeleteInput";
import { LoadDeleteOutput } from "./LoadDeleteOutput";

export interface ILoadDelete {
  handle(props: LoadDeleteInput): Promise<LoadDeleteOutput>;
}
