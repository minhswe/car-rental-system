import { Response } from 'express';

export const createResponse = <T = unknown>(
  res: Response,
  code: number,
  message: string,
  data?: T
) => {
  return res.status(code).json({
    message: message,
    data: data ?? null,
  });
};
