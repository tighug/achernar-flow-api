import { NextFunction, Request, Response } from "express";
import { INodeList } from "../../usecase/node/list/INodeList";
import { Sanitizer } from "./Sanitizer";
import { NodeSerializer } from "../serializer/NodeSerializer";

export class NodeController {
  constructor(private readonly nodeList: INodeList) {}

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { feederId } = req.params;
      const { fields } = req.query;
      const input = {
        feederId: Sanitizer.toFeederId(feederId),
        fields: Sanitizer.toFields(fields, false),
      };
      const nodes = await this.nodeList.handle(input);
      const nodesRO = NodeSerializer.serializeArray(nodes);

      res.json(nodesRO);
    } catch (err) {
      next(err);
    }
  }
}
