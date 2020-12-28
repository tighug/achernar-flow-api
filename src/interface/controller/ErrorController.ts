import { Request, Response } from "express";
import { ErrorSerializer } from "../serializer/error/ErrorSerializer";

export class ErrorController {
  private readonly errorPresenter: ErrorSerializer;

  constructor() {
    this.errorPresenter = new ErrorSerializer();
  }

  async get(err: Error, req: Request, res: Response): Promise<void> {
    const errorRO = this.errorPresenter.serialize(err);
    res.status(errorRO.error.status).json(errorRO);
  }
}
