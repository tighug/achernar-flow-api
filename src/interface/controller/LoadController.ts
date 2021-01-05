import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import validator from "validator";
import { ILoadListInteractor } from "../../usecase/load/ILoadListInteractor";
import { LoadSerializer } from "../serializer/load/LoadSerializer";

export class LoadController {
  private readonly loadSerializer: LoadSerializer;

  constructor(private readonly loadListInteractor: ILoadListInteractor) {
    this.loadSerializer = new LoadSerializer();
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { hour, minute, season } = req.query;

      if (hour === undefined)
        throw new createHttpError.BadRequest("hour is undefined.");
      if (minute === undefined)
        throw new createHttpError.BadRequest("minute is undefined.");
      if (season === undefined)
        throw new createHttpError.BadRequest("season is undefined.");
      if (typeof hour !== "string")
        throw new createHttpError.BadRequest("hour is invalid.");
      if (typeof minute !== "string")
        throw new createHttpError.BadRequest("minute is invalid.");
      if (typeof season !== "string")
        throw new createHttpError.BadRequest("season is invalid");
      if (!validator.isInt(hour))
        throw new createHttpError.BadRequest("hour must be integer.");
      if (!validator.isInt(minute))
        throw new createHttpError.BadRequest("minute must be integer.");

      const input = { hour: Number(hour), minute: Number(minute), season };
      const loads = await this.loadListInteractor.handle(input);
      const loadsRO = this.loadSerializer.serialize(loads);
      res.json(loadsRO);
    } catch (err) {
      next(err);
    }
  }
}
