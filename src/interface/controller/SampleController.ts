import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import validator from "validator";
import { ISampleList } from "../../usecase/sample/list/ISampleList";
import { SampleSerializer } from "../serializer/SampleSerializer";

export class SampleController {
  private readonly sampleSerializer: SampleSerializer;

  constructor(private readonly loadListInteractor: ISampleList) {
    this.sampleSerializer = new SampleSerializer();
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { type } = req.params;
      const { hour, minute, season, fields } = req.query;

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
      if (typeof fields !== "string")
        throw new createHttpError.BadRequest("fields must be string.");
      if (!validator.isInt(hour))
        throw new createHttpError.BadRequest("hour must be integer.");
      if (!validator.isInt(minute))
        throw new createHttpError.BadRequest("minute must be integer.");
      if (season !== "winter" && season !== "summer")
        throw new createHttpError.BadRequest("season is invalid.");
      if (type !== "load" && type !== "pv" && type !== "uchp" && type !== "ehp")
        throw new createHttpError.BadRequest("type is invalid.");

      const input = {
        hour: Number(hour),
        minute: Number(minute),
        season: season,
        type: type,
        fields: fields === undefined ? [] : fields.split(","),
      };

      const loads = await this.loadListInteractor.handle(input);
      const loadsRO = this.sampleSerializer.serializeArray(loads);
      res.json(loadsRO);
    } catch (err) {
      next(err);
    }
  }
}
