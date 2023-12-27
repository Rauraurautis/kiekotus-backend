import { addRound, getRounds } from "../services/round.service"
import { NextFunction, Request, Response } from "express"

export const getRoundsHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rounds = await getRounds(res.locals.id)
        return res.status(200).send(rounds)
    } catch (error: any) {
        next(error)
    }
}

export const postRoundHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const round = await addRound(req.body)
        return res.status(200).send(round)
    } catch (error: any) {
        next(error)
    }
}
