import { NextFunction, Response, Request } from "express";

export const requireUser = (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user
    console.log(user)
    if (!user) {
        return res.status(403).end()
    }
    return next()
}