import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import validator from "validator";
import { INodeListInteractor } from "../../usecase/node/list/INodeListInteractor";
import { NodePresenter } from "../presenter/node/NodePresenter";

export class NodeController {
  private readonly nodePresenter: NodePresenter;

  constructor(private readonly nodeListInteractor: INodeListInteractor) {
    this.nodePresenter = new NodePresenter();
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

      const nodes = await this.nodeListInteractor.handle(Number(feederId));
      const nodesRO = this.nodePresenter.serializeArray(nodes);

      res.json(nodesRO);
    } catch (err) {
      next(err);
    }
  }
}
