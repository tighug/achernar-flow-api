import { IBidderRepository } from "../../../domain/repository/IBidderRepository";
import { BidderListInput } from "./BidderListInput";
import { BidderListOutput } from "./BidderListOutput";
import { IBidderList } from "./IBidderList";

export class BidderList implements IBidderList {
  constructor(private readonly bidderRepository: IBidderRepository) {}

  handle({ fields, ...props }: BidderListInput): Promise<BidderListOutput> {
    return this.bidderRepository.findMany(props, fields);
  }
}
