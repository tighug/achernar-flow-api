import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { ErrorController } from "../interface/controller/ErrorController";

const errorController = new ErrorController();

export function notFoundError(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const err = new createHttpError.NotFound("Requested API is not found.");
  next(err);
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    errorController.get(err, req, res);
  } catch (err) {
    next(err);
  }
}
