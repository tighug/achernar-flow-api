import { IFeederListInteractor } from "../../usecase/feeder/list/IFeederListInteractor";
import { NextFunction, Request, Response } from "express";
import { FeederSerializer } from "../serializer/feeder/FeederSerializer";

export class FeederController {
  private readonly feederSerializer: FeederSerializer;

  constructor(private readonly feederListInteractor: IFeederListInteractor) {
    this.feederSerializer = new FeederSerializer();
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const feeders = await this.feederListInteractor.handle();
      const feedersRO = this.feederSerializer.serialize(feeders);
      res.json(feedersRO);
    } catch (err) {
      next(err);
    }
  }
}
