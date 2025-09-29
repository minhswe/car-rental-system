// error.config.ts
// Define valid status codes
type HttpStatusCode = 400 | 401 | 403 | 404 | 409 | 500;

export interface IAppError extends Error {
  statusCode: HttpStatusCode;
  isOperational: boolean;
  details?: any;
}

export class AppError extends Error implements IAppError {
  statusCode: HttpStatusCode;
  isOperational: boolean;
  details?: any;

  constructor(statusCode: HttpStatusCode, message?: string, details?: any) {
    const defaultMessages: Record<HttpStatusCode, string> = {
      400: "Bad Request",
      401: "Unauthorized",
      403: "Forbidden",
      404: "Not Found",
      409: "Conflict",
      500: "Internal Server Error",
    };

    super(message || defaultMessages[statusCode]);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = true;
    this.details = details;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// Convenience helpers
export const throwError = (
  statusCode: HttpStatusCode,
  message?: string,
  details?: any
): AppError => {
  return new AppError(statusCode, message, details);
};
