import { isHttpError } from "http-errors";

export class ErrorSerializer {
  static serialize(err: Error): ErrorRO {
    return {
      error: {
        status: isHttpError(err) ? err.status : 500,
        message: err.message,
      },
    };
  }
}

export interface ErrorRO {
  error: {
    status: number;
    message: string;
  };
}
