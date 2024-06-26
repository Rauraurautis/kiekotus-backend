import jwt, { JwtPayload } from "jsonwebtoken"
import config from "config"
import { DatabaseUser, TokenPayload } from "../types"
import { get } from "lodash"
import { getSingleUser } from "../../models/user.service"

const privateKey = process.env.PRIVATE_KEY || ""
const publicKey = process.env.PUBLIC_KEY || ""

export const signJWT = (object: Object, options?: jwt.SignOptions | undefined) => {
    return jwt.sign(object, process.env.SECRET || "")
}

export const verifyJwt = (token: string) => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET || "")
        return {
            valid: true,
            expired: false,
            decoded: decoded as TokenPayload
        }
    } catch (error: any) {
        return {
            valid: false,
            expired: error.message === "jwt expired",
            decoded: null
        }
    }

}

export const reIssueAccessToken = async (refreshToken: string) => {
    const { decoded } = verifyJwt(refreshToken) as JwtPayload

    const userId = get(decoded?.user, "id")

    if (!decoded || !userId) {
        return false
    }

    let user = await getSingleUser(Number(decoded.user.id))

    if (!user) return false

    const accessTokenTtl = "1m"
    const accessToken = signJWT({ user: { email: user.email, name: user.username, id: user.id } }, { expiresIn: accessTokenTtl })
    return accessToken
}