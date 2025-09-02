import { throwError } from "common/configs/error.config";
import { Request, Response, NextFunction } from "express";
import { z } from "zod"

const validateBodyRequest = (schema: z.ZodSchema, req: Request, next: NextFunction) => {
    try{
        const data = schema.parse(req.body);
        req.body = data;
        next();
    }catch (error: any) {
        if (error.errors && Array.isArray(error.errors)) {
            const allMessage = error.errors.map((err: any) => `${err.path}: ${err.message}`).join(", ");
            return throwError(400, allMessage);
        }
        return throwError(400, "Invalid request");
    }
}

export default validateBodyRequest;
