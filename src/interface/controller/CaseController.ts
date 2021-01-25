import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { ICaseDelete } from "../../usecase/case/delete/ICaseDelete";
import { ICaseGet } from "../../usecase/case/get/ICaseGet";
import { ICaseList } from "../../usecase/case/list/ICaseList";
import { ICaseRegister } from "../../usecase/case/register/ICaseRegister";
import { CaseSerializer } from "../serializer/CaseSerializer";
import { Sanitizer } from "./Sanitizer";

export class CaseController {
  constructor(
    private readonly caseRegister: ICaseRegister,
    private readonly caseGet: ICaseGet,
    private readonly caseList: ICaseList,
    private readonly caseDelete: ICaseDelete
  ) {}

  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const {
        feederId,
        hour,
        minute,
        pvCount,
        pvScale,
        loadScale,
        seed,
      } = req.body;
      const input = {
        feederId: Sanitizer.toFeederId(feederId),
        hour: Sanitizer.toHour(hour),
        minute: Sanitizer.toMinute(minute),
        pvCount: Sanitizer.toPvCount(pvCount),
        pvScale: Sanitizer.toPvScale(pvScale),
        loadScale: Sanitizer.toLoadScale(loadScale),
        seed: Sanitizer.toSeed(seed),
      };
      const c = await this.caseRegister.handle(input);
      const caseRO = CaseSerializer.serialize(c);

      res.json(caseRO);
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
      const c = await this.caseGet.handle(input);

      if (c === null) throw new createHttpError.NotFound("Not found.");

      const caseRO = CaseSerializer.serialize(c);

      res.json(caseRO);
    } catch (err) {
      next(err);
    }
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { feederId } = req.params;
      const { fields } = req.query;
      const input = {
        feederId: Sanitizer.toFeederId(feederId),
        fields: Sanitizer.toFields(fields, false),
      };
      const cases = await this.caseList.handle(input);
      const casesRO = CaseSerializer.serializeArray(cases);

      res.json(casesRO);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const input = {
        id: Sanitizer.toId(id),
      };
      const c = await this.caseDelete.handle(input);
      const caseRO = CaseSerializer.serialize(c);

      res.json(caseRO);
    } catch (err) {
      next(err);
    }
  }
}
