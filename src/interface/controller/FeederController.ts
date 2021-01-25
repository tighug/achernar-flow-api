import { IFeederList } from "../../usecase/feeder/list/IFeederList";
import { NextFunction, Request, Response } from "express";
import { FeederSerializer } from "../serializer/FeederSerializer";
import { Sanitizer } from "./Sanitizer";

export class FeederController {
  constructor(private readonly feederList: IFeederList) {}

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { fields } = req.query;
      const input = {
        fields: Sanitizer.toFields(fields, false),
      };
      const feeders = await this.feederList.handle(input);
      const feedersRO = FeederSerializer.serializeArray(feeders);
      res.json(feedersRO);
    } catch (err) {
      next(err);
    }
  }
}
