import { NextFunction, Request, Response } from "express";
import validator from "validator";
import createError from "http-errors";
import { ILineListInteractor } from "../../usecase/line/list/ILineListInteractor";
import { LineSerializer } from "../serializer/line/LineSerializer";

export class LineController {
  private readonly linePresenter: LineSerializer;

  constructor(private readonly lineListInteractor: ILineListInteractor) {
    this.linePresenter = new LineSerializer();
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { feederId } = req.query;

      if (feederId === undefined)
        throw new createError.BadRequest("feederId is undefined.");
      if (typeof feederId !== "string")
        throw new createError.BadRequest("feederId is invalid.");
      if (!validator.isInt(feederId))
        throw new createError.BadRequest("feederId must be integer.");

      const input = { feederId: Number(feederId) };
      const lines = await this.lineListInteractor.handle(input);
      const linesRO = this.linePresenter.serialize(lines);
      res.json(linesRO);
    } catch (err) {
      next(err);
    }
  }
}
