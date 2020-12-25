import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import validator from "validator";
import { IJointListInteractor } from "../../usecase/joint/list/IJointListInteractor";
import { JointPresenter } from "../presenter/joint/JointPresenter";

export class JointController {
  private readonly jointPresenter: JointPresenter;

  constructor(private readonly jointListInteractor: IJointListInteractor) {
    this.jointPresenter = new JointPresenter();
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { feederId } = req.query;

      if (feederId === undefined)
        throw new createHttpError.BadRequest("feederId is undefined.");
      if (typeof feederId !== "string")
        throw new createHttpError.BadRequest("feederId is invalid.");
      if (!validator.isInt(feederId))
        throw new createHttpError.BadRequest("feederId must be integer.");

      const joints = await this.jointListInteractor.handle(Number(feederId));
      const jointsRO = this.jointPresenter.serializeArray(joints);

      res.json(jointsRO);
    } catch (err) {
      next(err);
    }
  }
}
