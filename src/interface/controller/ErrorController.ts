import { Request, Response } from "express";
import { ErrorPresenter } from "../presenter/error/ErrorPresenter";

export class ErrorController {
  private readonly errorPresenter: ErrorPresenter;

  constructor() {
    this.errorPresenter = new ErrorPresenter();
  }

  async get(err: Error, req: Request, res: Response): Promise<void> {
    const errorRO = this.errorPresenter.serialize(err);
    res.status(errorRO.error.status).json(errorRO);
  }
}
