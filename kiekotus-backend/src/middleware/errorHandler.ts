import { NextFunction, Response, Request } from "express";
import multer from "multer";
import { AppError } from "../lib/utils/AppError";



export const errorHandler = async (error: any, res: Response) => {

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message, errorCode: error.errorCode })
    }

    return res.status(500).json(error)
}