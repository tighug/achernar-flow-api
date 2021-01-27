import { NextFunction, Request, Response } from "express";
import { ILoadDelete } from "../../usecase/load/delete/ILoadDelete";
import { ILoadList } from "../../usecase/load/list/ILoadList";
import { LoadSerializer } from "../serializer/LoadSerializer";
import { Sanitizer } from "./Sanitizer";

export class LoadController {
  constructor(
    private readonly loadList: ILoadList,
    private readonly loadDelete: ILoadDelete
  ) {}

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { caseId } = req.params;
      const { type, fields } = req.query;
      const input = {
        caseId: Sanitizer.toCaseId(caseId),
        type: Sanitizer.toType(type),
        fields: Sanitizer.toFields(fields),
      };
      const loads = await this.loadList.handle(input);
      const loadsRO = LoadSerializer.serializeArray(loads);

      res.json(loadsRO);
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
      await this.loadDelete.handle(input);

      res.send();
    } catch (err) {
      next(err);
    }
  }
}
