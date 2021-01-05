import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import validator from "validator";
import { IPVListInteractor } from "../../usecase/pv/IPVListInteractor";
import { PVSerializer } from "../serializer/pv/PVSerializer";

export class PVController {
  private readonly pvSerializer: PVSerializer;

  constructor(private readonly pvListInteractor: IPVListInteractor) {
    this.pvSerializer = new PVSerializer();
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { hour, minute } = req.query;

      if (hour === undefined)
        throw new createHttpError.BadRequest("hour is undefined.");
      if (minute === undefined)
        throw new createHttpError.BadRequest("minute is undefined.");
      if (typeof hour !== "string")
        throw new createHttpError.BadRequest("hour is invalid.");
      if (typeof minute !== "string")
        throw new createHttpError.BadRequest("minute is invalid.");
      if (!validator.isInt(hour))
        throw new createHttpError.BadRequest("hour must be integer.");
      if (!validator.isInt(minute))
        throw new createHttpError.BadRequest("minute must be integer.");

      const input = { hour: Number(hour), minute: Number(minute) };
      const pvs = await this.pvListInteractor.handle(input);
      const pvsRO = this.pvSerializer.serialize(pvs);
      res.json(pvsRO);
    } catch (err) {
      next(err);
    }
  }
}
