import { DeepPartial } from "../model/DeepPartial";
import { NodalPrice } from "../model/NodalPrice";

export interface INodalPriceRepository {
  save(nodalPrice: NodalPrice): Promise<Required<NodalPrice>>;
  findMany(
    props: { bidCaseId: number },
    fields?: string[]
  ): Promise<DeepPartial<NodalPrice>[]>;
}
