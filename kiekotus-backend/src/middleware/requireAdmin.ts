import { NextFunction, Response, Request } from "express";

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user
    if (user.role !== "admin") {
        return res.status(403).end()
    }
    return next()
}