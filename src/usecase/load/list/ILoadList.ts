import { LoadListInput } from "./LoadListInput";
import { LoadListOutput } from "./LoadListOutput";

export interface ILoadList {
  handle(props: LoadListInput): Promise<LoadListOutput>;
}
