import { NextFunction, Request, Response } from "express"
import logger from "../lib/utils/logger"
import { addCourse, addHole, getAllCourses, getSingleCourse } from "../services/course.service"

export const getSingleCourseHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id)
        const course = await getSingleCourse(id)
        return res.status(200).send(course)
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const getAllCoursesHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courses = await getAllCourses()
        return res.status(200).send(courses)
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const postCourseHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newCourse = await addCourse(req.body)
        return res.status(200).send(newCourse)
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const postHoleHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newHole = await addHole(req.body, Number(req.params.id))
        return res.status(200).send(newHole)
    } catch (error) {
        logger.error(error)
        next(error)
    }
}