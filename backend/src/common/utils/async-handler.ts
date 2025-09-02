import { Request, Response, NextFunction, RequestHandler } from 'express';

const asyncHandler =
  (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
  ): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default asyncHandler;
