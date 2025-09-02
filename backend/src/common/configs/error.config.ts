class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message || 'Internal Server Error');
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}
export const throwError = (statusCode: number, message: string) => {
  throw new AppError(statusCode, message);
};
