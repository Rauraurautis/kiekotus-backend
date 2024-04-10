import { NextFunction, Request, Response } from "express"
import { reIssueAccessToken } from "./utils/jwt.utils"
import log from "./utils/logger"

export const handleTokenRefresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.cookies["refreshToken"]
        
        const newAccessToken = await reIssueAccessToken(refreshToken)
        console.log(newAccessToken)
        if (newAccessToken) {
            return res.status(200).send({ accessToken: newAccessToken })
        }
        return res.status(400).send({message: "No proper refresh token provided"})
    } catch (error) {
        log.error(error)
    }
}