import { NextFunction, Request, Response } from "express";
import { NodalPriceList } from "../../usecase/nodalPrice/list/NodalPriceList";
import { NodalPriceSerializer } from "../serializer/NodalPriceSerializer";
import { Sanitizer } from "./Sanitizer";

export class NodalPriceController {
  constructor(private readonly nodalPriceList: NodalPriceList) {}

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { bidCaseId } = req.params;
      const { fields } = req.query;
      const input = {
        bidCaseId: Sanitizer.toBidCaseId(bidCaseId),
        fields: Sanitizer.toFields(fields, false),
      };
      const nodalPrices = await this.nodalPriceList.handle(input);
      const nodalPricesRO = NodalPriceSerializer.serializeArray(nodalPrices);

      res.json(nodalPricesRO);
    } catch (err) {
      next(err);
    }
  }
}
