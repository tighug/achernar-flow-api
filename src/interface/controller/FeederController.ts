import { IFeederListInteractor } from "../../usecase/feeder/list/IFeederListInteractor";
import { NextFunction, Request, Response } from "express";
import { FeederPresenter } from "../presenter/feeder/FeederPresenter";

export class FeederController {
  private readonly feederPresenter: FeederPresenter;

  constructor(private readonly feederListInteractor: IFeederListInteractor) {
    this.feederPresenter = new FeederPresenter();
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const feeders = await this.feederListInteractor.handle();
      const feedersRO = this.feederPresenter.serializeArray(feeders);

      res.json(feedersRO);
    } catch (err) {
      next(err);
    }
  }
}
