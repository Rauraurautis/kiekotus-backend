import { and, eq, or } from "drizzle-orm";
import { db } from "../lib/drizzle";
import { friendships, statistics, users } from "../lib/drizzle/schema";
import { NonregisteredPlayerType, UserType } from "../lib/zod/schemas/user.schema";
import bcrypt from "bcrypt"
import { signJWT } from "../lib/utils/jwt.utils";
import { createSession } from "./sessions.model";
import { SessionType } from "../lib/zod/schemas/session.schema";
import { omit } from "lodash";
import { AppError } from "../lib/utils/AppError";

export const getSingleUser = async (id: number) => {
    const user = await db.query.users.findFirst({
        where: eq(users.id, id), columns: {
            password: false
        }
    })

    return user
}

export const getAllUsers = async () => {
    const users = await db.query.users.findMany({
        columns: {
            password: false
        }
    })
    return users
}


export const addUser = async (input: UserType) => {
    const { password, confirmPassword } = input
    if (password !== confirmPassword) throw Error()
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await db.insert(users).values({ ...input, password: hashedPassword, role: "user" }).returning()
    const userStatistics = await db.insert(statistics).values({ userId: user[0].id })
    console.log(userStatistics)
    return user[0]
}

export const loginUser = async (input: SessionType) => {
    const user = await validatePassword(input)

    if (!user) {
        throw new AppError("Wrong password!", 401, 401)
    }

    const accessToken = signJWT({ user: { email: user.email, name: user.username, id: user.id } }, { expiresIn: "1m" })
    const refreshToken = signJWT({ user: { email: user.email, name: user.username, id: user.id } }, { expiresIn: "30d" })

    return { accessToken, refreshToken }
}

export const validatePassword = async (input: SessionType) => {
    const user = await db.query.users.findFirst({
        where: eq(users.email, input.email)
    })

    if (!user || !user.password) {
        return false
    }

    const passwordMatch = await bcrypt.compare(input.password, user.password)
    if (!passwordMatch) {
        return false
    }
    return user
}


// Nonregistered players
/*
export const addNonregisteredPlayer = async (player: NonregisteredPlayerType, id: number) => {
    const newNonregisteredPlayer = await db.insert(nonregisteredPlayers).values({ name: player.name, userId: id }).returning()
    return newNonregisteredPlayer
}

export const getAllNonregisteredPlayers = async (id: number) => {
    const allNonregisteredPlayers = await db.query.nonregisteredPlayers.findMany({
        where: eq(nonregisteredPlayers.userId, id)
    })

    return allNonregisteredPlayers
} */