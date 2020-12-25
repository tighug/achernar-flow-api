import { NextFunction, Request, Response } from "express";
import { ILineListInteractor } from "../../usecase/line/list/ILineListInteractor";
import createError from "http-errors";
import validator from "validator";
import { LinePresenter } from "../presenter/line/LinePresetner";

export class LineController {
  private readonly linePresenter: LinePresenter;

  constructor(private readonly lineListInteractor: ILineListInteractor) {
    this.linePresenter = new LinePresenter();
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { feederId } = req.body.query;

      if (feederId === undefined)
        throw new createError.BadRequest("feederId is undefined.");
      if (!validator.isInt(feederId))
        throw new createError.BadRequest("feederId must be integer.");

      const lines = await this.lineListInteractor.handle(Number(feederId));
      const linesRO = this.linePresenter.serializeArray(lines);

      res.json(linesRO);
    } catch (err) {
      next(err);
    }
  }
}