import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { IBidCaseDelete } from "../../usecase/bidCase/delete/IBidCaseDelete";
import { IBidCaseGet } from "../../usecase/bidCase/get/IBidCaseGet";
import { IBidCaseList } from "../../usecase/bidCase/list/IBidCaseList";
import { IBidCaseRegister } from "../../usecase/bidCase/register/IBidCaseRegister";
import { BidCaseSerializer } from "../serializer/BidCaseSerializer";
import { Sanitizer } from "./Sanitizer";

export class BidCaseController {
  constructor(
    private readonly bidCaseRegister: IBidCaseRegister,
    private readonly bidCaseGet: IBidCaseGet,
    private readonly bidCaseList: IBidCaseList,
    private readonly bidCaseDelete: IBidCaseDelete
  ) {}

  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const {
        caseId,
        buyerCount,
        sellerCount,
        minBuyPrice,
        maxBuyPrice,
        minSellPrice,
        maxSellPrice,
        minBuyVolume,
        maxBuyVolume,
        minSellVolume,
        maxSellVolume,
        seed,
      } = req.body;
      const input = {
        caseId: Sanitizer.toCaseId(caseId),
        buyerCount: Sanitizer.toBuyerCount(buyerCount),
        sellerCount: Sanitizer.toSellerCount(sellerCount),
        minBuyPrice: Sanitizer.toMinBuyPrice(minBuyPrice),
        maxBuyPrice: Sanitizer.toMaxBuyPrice(maxBuyPrice),
        minSellPrice: Sanitizer.toMinSellPrice(minSellPrice),
        maxSellPrice: Sanitizer.toMaxSellPrice(maxSellPrice),
        minBuyVolume: Sanitizer.toMinBuyVolume(minBuyVolume),
        maxBuyVolume: Sanitizer.toMaxBuyVolume(maxBuyVolume),
        minSellVolume: Sanitizer.toMinSellVolume(minSellVolume),
        maxSellVolume: Sanitizer.toMaxSellVolume(maxSellVolume),
        seed: Sanitizer.toSeed(seed),
      };
      const bidCase = await this.bidCaseRegister.handle(input);
      const bidCaseRO = BidCaseSerializer.serialize(bidCase);

      res.json(bidCaseRO);
    } catch (err) {
      next(err);
    }
  }

  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { fields } = req.query;
      const input = {
        id: Sanitizer.toId(id),
        fields: Sanitizer.toFields(fields, false),
      };
      const bidCase = await this.bidCaseGet.handle(input);

      if (bidCase === null) throw new createHttpError.NotFound("Not found.");

      const bidCaseRO = BidCaseSerializer.serialize(bidCase);

      res.json(bidCaseRO);
    } catch (err) {
      next(err);
    }
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { caseId } = req.params;
      const { fields } = req.query;
      const input = {
        caseId: Sanitizer.toCaseId(caseId),
        fields: Sanitizer.toFields(fields, false),
      };
      const bidCases = await this.bidCaseList.handle(input);
      const bidCasesRO = BidCaseSerializer.serializeArray(bidCases);

      res.json(bidCasesRO);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const input = {
        id: Sanitizer.toId(id),
        fields: [],
      };

      await this.bidCaseDelete.handle(input);

      res.send();
    } catch (err) {
      next(err);
    }
  }
}
