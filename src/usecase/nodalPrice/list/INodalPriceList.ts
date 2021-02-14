import { NodalPriceListInput } from "./NodalPriceListInput";
import { NodalPriceOutput } from "./NodalPriceListOutput";

export interface INodalPriceList {
  handle(props: NodalPriceListInput): Promise<NodalPriceOutput>;
}
