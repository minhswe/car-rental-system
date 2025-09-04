import { Request, Response } from "express";

const notFoundMiddleware = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: "API not found",
  });
};

export default notFoundMiddleware;
