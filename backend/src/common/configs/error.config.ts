// Valid HTTP status codes (subset for simplicity, expand as needed)
type HttpStatusCode = 400 | 401 | 403 | 404 | 409 | 500;

// Interface for AppError to ensure type safety
interface IAppError extends Error {
  statusCode: HttpStatusCode;
  isOperational: boolean;
  details?: any; // For additional error details (e.g., Zod errors)
}

export class AppError extends Error implements IAppError {
  statusCode: HttpStatusCode;
  isOperational: boolean;
  details?: any;

  constructor(statusCode: HttpStatusCode, message: string, details?: any) {
    // Use a default message based on status code if none provided
    const defaultMessages: Record<HttpStatusCode, string> = {
      400: "Bad Request",
      401: "Unauthorized",
      403: "Forbidden",
      404: "Not Found",
      409: "Conflict",
      500: "Internal Server Error",
    };
    super(message || defaultMessages[statusCode] || "Internal Server Error");

    this.statusCode = statusCode;
    this.isOperational = true; // Mark as operational error
    this.details = details;

    // Capture stack trace (excluding constructor)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// Specific error classes
export class BadRequestError extends AppError {
  constructor(message: string = "Bad Request", details?: any) {
    super(400, message, details);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = "Conflict", details?: any) {
    super(409, message, details);
  }
}

// Throw error helper
export const throwError = (
  statusCode: HttpStatusCode,
  message: string,
  details?: any
) => {
  // Validate status code
  const validStatusCodes: HttpStatusCode[] = [400, 401, 403, 404, 409, 500];
  if (!validStatusCodes.includes(statusCode)) {
    throw new AppError(500, `Invalid status code: ${statusCode}`);
  }
  throw new AppError(statusCode, message, details);
};
