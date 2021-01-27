import { NextFunction, Request, Response } from "express";
import { IFlowDelete } from "../../usecase/flow/delete/IFlowDelete";
import { IFlowList } from "../../usecase/flow/list/IFlowList";
import { FlowSerializer } from "../serializer/FlowSerializer";
import { Sanitizer } from "./Sanitizer";

export class FlowController {
  constructor(
    private readonly flowList: IFlowList,
    private readonly flowDelete: IFlowDelete
  ) {}

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { caseId } = req.params;
      const { before, fields } = req.query;
      const input = {
        caseId: Sanitizer.toCaseId(caseId),
        before: Sanitizer.toBefore(before),
        fields: Sanitizer.toFields(fields, false),
      };
      const flows = await this.flowList.handle(input);
      const flowsRO = FlowSerializer.serializeArray(flows);

      res.json(flowsRO);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { caseId } = req.params;
      const input = {
        caseId: Sanitizer.toCaseId(caseId),
      };

      await this.flowDelete.handle(input);

      res.send();
    } catch (err) {
      next(err);
    }
  }
}
