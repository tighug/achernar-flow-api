import { isHttpError } from "http-errors";
import { ErrorRO } from "./ErrorRO";

export class ErrorSerializer {
  serialize(err: Error): ErrorRO {
    return {
      error: {
        status: isHttpError(err) ? err.status : 500,
        message: err.message,
      },
    };
  }
}
