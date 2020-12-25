import { NextFunction, Request, Response } from "express";
import { IJointListInteractor } from "../../usecase/joint/list/IJointListInteractor";
import validator from "validator";
import createError from "http-errors";
import { JointPresenter } from "../presenter/joint/JointPresenter";

export class JointController {
  private readonly jointPresenter: JointPresenter;

  constructor(private readonly jointListInteractor: IJointListInteractor) {
    this.jointPresenter = new JointPresenter();
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { feederId } = req.body.query;

      if (feederId === undefined)
        throw new createError.BadRequest("feederId is undefined.");
      if (!validator.isInt(feederId))
        throw new createError.BadRequest("feederId must be integer.");

      const joints = await this.jointListInteractor.handle(Number(feederId));
      const jointsRO = this.jointPresenter.serializeArray(joints);

      res.json(jointsRO);
    } catch (err) {
      next(err);
    }
  }
}
