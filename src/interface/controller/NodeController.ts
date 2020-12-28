import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import validator from "validator";
import { INodeListInteractor } from "../../usecase/node/list/INodeListInteractor";
import { NodeSerializer } from "../serializer/node/NodeSerializer";

export class NodeController {
  private readonly nodePresenter: NodeSerializer;

  constructor(private readonly nodeListInteractor: INodeListInteractor) {
    this.nodePresenter = new NodeSerializer();
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

      const input = { feederId: Number(feederId) };
      const nodes = await this.nodeListInteractor.handle(input);
      const nodesRO = this.nodePresenter.serialize(nodes);
      res.json(nodesRO);
    } catch (err) {
      next(err);
    }
  }
}
