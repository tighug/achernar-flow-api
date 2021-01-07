import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import validator from "validator";
import { ISampleListInteractor } from "../../usecase/sample/list/ISampleListInteractor";
import { SampleSerializer } from "../serializer/sample/SampleSerializer";

export class SampleController {
  private readonly sampleSerializer: SampleSerializer;

  constructor(private readonly loadListInteractor: ISampleListInteractor) {
    this.sampleSerializer = new SampleSerializer();
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { hour, minute, season, type } = req.query;

      if (hour === undefined)
        throw new createHttpError.BadRequest("hour is undefined.");
      if (minute === undefined)
        throw new createHttpError.BadRequest("minute is undefined.");
      if (season === undefined)
        throw new createHttpError.BadRequest("season is undefined.");
      if (type === undefined)
        throw new createHttpError.BadRequest("type is undefined.");
      if (typeof hour !== "string")
        throw new createHttpError.BadRequest("hour is invalid.");
      if (typeof minute !== "string")
        throw new createHttpError.BadRequest("minute is invalid.");
      if (typeof season !== "string")
        throw new createHttpError.BadRequest("season is invalid");
      if (typeof type !== "string")
        throw new createHttpError.BadRequest("type is invalid");
      if (!validator.isInt(hour))
        throw new createHttpError.BadRequest("hour must be integer.");
      if (!validator.isInt(minute))
        throw new createHttpError.BadRequest("minute must be integer.");

      const input = {
        hour: Number(hour),
        minute: Number(minute),
        season,
        type,
      };
      const loads = await this.loadListInteractor.handle(input);
      const loadsRO = this.sampleSerializer.serialize(loads);
      res.json(loadsRO);
    } catch (err) {
      next(err);
    }
  }
}
