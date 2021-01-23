import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import validator from "validator";
import { INodeList } from "../../usecase/node/list/INodeList";
import { NodeSerializer } from "../serializer/NodeSerializer";

export class NodeController {
  private readonly nodePresenter: NodeSerializer;

  constructor(private readonly nodeListInteractor: INodeList) {
    this.nodePresenter = new NodeSerializer();
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { feederId } = req.params;

      if (feederId === undefined)
        throw new createHttpError.BadRequest("feederId is undefined.");
      if (!validator.isInt(feederId))
        throw new createHttpError.BadRequest("feederId must be integer.");

      const input = { feederId: Number(feederId) };
      const nodes = await this.nodeListInteractor.handle(input);
      const nodesRO = this.nodePresenter.serializeArray(nodes);
      res.json(nodesRO);
    } catch (err) {
      next(err);
    }
  }
}
