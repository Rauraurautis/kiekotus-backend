import { NextFunction, Response, Request } from "express";

export const parseStringified = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body
    const numerifiedHoles = {
        ...body, holes: body.holes.map((el: { distance: string, par: string }) => {
            return { distance: parseInt(el.distance), par: parseInt(el.par) }
        })
    }
    console.log(numerifiedHoles)
    req.body = numerifiedHoles
    return next()
}