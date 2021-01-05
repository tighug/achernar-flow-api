import { PVListInput } from "./PVListInput";
import { PVListOutput } from "./PVListOutput";

export interface IPVListInteractor {
  handle(input: PVListInput): Promise<PVListOutput>;
}
