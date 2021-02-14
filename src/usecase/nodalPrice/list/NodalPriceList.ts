import { INodalPriceRepository } from "../../../domain/repository/INodalPriceRepository";
import { INodalPriceList } from "./INodalPriceList";
import { NodalPriceListInput } from "./NodalPriceListInput";
import { NodalPriceOutput } from "./NodalPriceListOutput";

export class NodalPriceList implements INodalPriceList {
  constructor(private readonly nodalPriceRepository: INodalPriceRepository) {}

  handle({ fields, ...props }: NodalPriceListInput): Promise<NodalPriceOutput> {
    return this.nodalPriceRepository.findMany(props, fields);
  }
}
