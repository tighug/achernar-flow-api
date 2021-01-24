import { NextFunction, Request, Response } from "express";
import { ISampleList } from "../../usecase/sample/list/ISampleList";
import { SampleSerializer } from "../serializer/SampleSerializer";
import { Sanitizer } from "./Sanitizer";

export class SampleController {
  constructor(private readonly loadList: ISampleList) {}

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { type } = req.params;
      const { hour, minute, season, fields } = req.query;
      const input = {
        hour: Sanitizer.toHour(hour),
        minute: Sanitizer.toMinute(minute),
        season: Sanitizer.toSeason(season),
        type: Sanitizer.toType(type),
        fields: Sanitizer.toFields(fields, false),
      };
      const loads = await this.loadList.handle(input);
      const loadsRO = SampleSerializer.serializeArray(loads);

      res.json(loadsRO);
    } catch (err) {
      next(err);
    }
  }
}
