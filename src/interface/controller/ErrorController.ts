import { Request, Response } from "express";
import { ErrorSerializer } from "../serializer/ErrorSerializer";

export class ErrorController {
  async get(err: Error, req: Request, res: Response): Promise<void> {
    const errorRO = ErrorSerializer.serialize(err);
    res.status(errorRO.error.status).json(errorRO);
  }
}
