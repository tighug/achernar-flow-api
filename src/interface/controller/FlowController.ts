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
      const { bidCaseId, type, fields } = req.query;
      const input = {
        caseId: Sanitizer.toCaseId(caseId),
        bidCaseId: Sanitizer.toBidCaseId(bidCaseId, false, 0),
        type: Sanitizer.toFlowType(type),
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
