import { addRound, getRounds } from "../models/round.model"
import { NextFunction, Request, Response } from "express"

export const getRoundsHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rounds = await getRounds(Number(req.params.userId))
        return res.status(200).send(rounds)
    } catch (error: any) {
        next(error)
    }
}

export const getAllRoundsHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rounds = await getRounds(res.locals.id)
        return res.status(200).send(rounds)
    } catch (error: any) {
        next(error)
    }
}

export const postRoundHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Objektin muoto vaihtelee, pitää korjata jossain vaiheessa
        const userId = res.locals.user._id ?? res.locals.user.user._id
        const round = await addRound(req.body, userId)
        console.log(req.body)
        return res.status(200).send(round)
    } catch (error: any) {
        next(error)
    }
}
