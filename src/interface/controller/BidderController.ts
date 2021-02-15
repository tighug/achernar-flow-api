import { NextFunction, Request, Response } from "express";
import { IBidderList } from "../../usecase/bidder/list/IBidderList";
import { BidderSerializer } from "../serializer/BidderSerializer";
import { Sanitizer } from "./Sanitizer";

export class BidderController {
  constructor(private readonly bidderList: IBidderList) {}

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { bidCaseId } = req.params;
      const { type, fields } = req.query;
      const input = {
        bidCaseId: Sanitizer.toBidCaseId(bidCaseId),
        type: Sanitizer.toFlowType(type),
        fields: Sanitizer.toFields(fields, false),
      };
      const bidders = await this.bidderList.handle(input);
      const biddersRO = BidderSerializer.serializeArray(bidders);

      res.json(biddersRO);
    } catch (err) {
      next(err);
    }
  }
}
