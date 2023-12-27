import { NextFunction, Request, Response } from "express"
import logger from "../lib/utils/logger"
import { addNewPlayedCourse, getUserStatistics } from "../services/statistics.service"

export const getUserStatisticsHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const stats = await getUserStatistics(res.locals.user.id)
        return res.status(200).send(stats)
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const postNewPlayedCourseHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const stats = await addNewPlayedCourse(res.locals.user.id, req.body)
        return res.status(200).send(stats)
    } catch (error) {
        logger.error(error)
        next(error)
    }
}