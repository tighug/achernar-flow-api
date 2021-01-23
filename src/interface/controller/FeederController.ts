import { IFeederList } from "../../usecase/feeder/list/IFeederList";
import { NextFunction, Request, Response } from "express";
import { FeederSerializer } from "../serializer/FeederSerializer";

export class FeederController {
  private readonly feederSerializer: FeederSerializer;

  constructor(private readonly feederListInteractor: IFeederList) {
    this.feederSerializer = new FeederSerializer();
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const feeders = await this.feederListInteractor.handle();
      const feedersRO = this.feederSerializer.serializeArray(feeders);
      res.json(feedersRO);
    } catch (err) {
      next(err);
    }
  }
}
