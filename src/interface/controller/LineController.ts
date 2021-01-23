import { NextFunction, Request, Response } from "express";
import validator from "validator";
import createError from "http-errors";
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

      if (feederId === undefined)
        throw new createError.BadRequest("feederId is undefined.");
      if (!validator.isInt(feederId))
        throw new createError.BadRequest("feederId must be integer.");

      const input = { feederId: Number(feederId) };
      const lines = await this.lineListInteractor.handle(input);
      const linesRO = this.lineSerializer.serializeArray(lines);
      res.json(linesRO);
    } catch (err) {
      next(err);
    }
  }
}
