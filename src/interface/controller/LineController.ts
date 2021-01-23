import { NextFunction, Request, Response } from "express";
import validator from "validator";
import createHttpError from "http-errors";
import { ILineList } from "../../usecase/line/list/ILineList";
import { LineSerializer } from "../serializer/LineSerializer";

export class LineController {
  private readonly lineSerializer: LineSerializer;

  constructor(private readonly lineListInteractor: ILineList) {
    this.lineSerializer = new LineSerializer();
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { feederId } = req.params;
      const { fields } = req.query;

      if (feederId === undefined)
        throw new createHttpError.BadRequest("feederId is undefined.");
      if (typeof fields !== "string")
        throw new createHttpError.BadRequest("fields must be string.");
      if (!validator.isInt(feederId))
        throw new createHttpError.BadRequest("feederId must be integer.");

      const input = {
        feederId: Number(feederId),
        fields: fields === undefined ? [] : fields.split(","),
      };
      const lines = await this.lineListInteractor.handle(input);
      const linesRO = this.lineSerializer.serializeArray(lines);
      res.json(linesRO);
    } catch (err) {
      next(err);
    }
  }
}
