import { NextFunction, Request, Response } from "express"
import logger from "../lib/utils/logger"
import { loginUser } from "../models/user.service"


export const loginHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tokens = await loginUser(req.body)
        return res.cookie("refreshToken", tokens.refreshToken, { httpOnly: true })
            .send({ accessToken: tokens.accessToken })
    } catch (error: any) {
        next(error)
    }
}

/*
export const getUserSessionsHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = res.locals.user._id
        const sessions = await findSessions({ user: userId })
        return res.send(sessions)
    } catch (error: any) {
        logger.error(error)
        return next(error)
    }
}

export const deleteSessionHandler = async (req: Request, res: Response, next: NextFunction) => {
    const sessionId = res.locals.user.session
    await updateSession({ _id: sessionId }, { valid: false })
    return res.send({
        accessToken: null,
        refreshToken: null
    })
} */