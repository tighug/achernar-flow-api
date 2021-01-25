import { NextFunction, Request, Response } from "express";
import { ILineList } from "../../usecase/line/list/ILineList";
import { LineSerializer } from "../serializer/LineSerializer";
import { Sanitizer } from "./Sanitizer";

export class LineController {
  constructor(private readonly lineList: ILineList) {}

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { feederId } = req.params;
      const { fields } = req.query;
      const input = {
        feederId: Sanitizer.toFeederId(feederId),
        fields: Sanitizer.toFields(fields, false),
      };
      const lines = await this.lineList.handle(input);
      const linesRO = LineSerializer.serializeArray(lines);

      res.json(linesRO);
    } catch (err) {
      next(err);
    }
  }
}
