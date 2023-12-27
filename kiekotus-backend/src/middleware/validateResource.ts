import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const validateBody = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body)
        next()
    } catch (error: any) {
        next(error)
    }
}

export const validateParams = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.params)
        next()
    } catch (error: any) {
        next(error)
    }
}


