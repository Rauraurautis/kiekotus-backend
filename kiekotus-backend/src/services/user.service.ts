import { and, eq, or } from "drizzle-orm";
import { db } from "../lib/drizzle";
import { friendships, statistics, users } from "../lib/drizzle/schema";
import { NonregisteredPlayerType, UserType } from "../lib/zod/schemas/user.schema";
import bcrypt from "bcrypt"
import { signJWT } from "../lib/utils/jwt.utils";
import { createSession } from "./sessions.service";
import { SessionType } from "../lib/zod/schemas/session.schema";
import { omit } from "lodash";

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
    const user = await db.insert(users).values({ ...input, password: hashedPassword }).returning()
    const userStatistics = await db.insert(statistics).values({ userId: user[0].id })
    console.log(userStatistics)
    return user[0]
}

export const createUserSession = async (input: SessionType, userAgent: string) => {
    const user = await validatePassword(input)

    if (!user) {
        throw Error()
    }
    const session = await createSession(user, userAgent)

    const accessToken = signJWT({ user: { email: user.email, name: user.username, id: user.id }, session: session.id }, { expiresIn: "30d" })
    const refreshToken = signJWT({ user: { email: user.email, name: user.username, id: user.id }, session: session.id }, { expiresIn: "365d" })

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

// Friends

export const addFriend = async (id: number, friendId: number) => {

    const checkIfAlreadyExists = await db.query.friendships.findFirst({
        where: and(or(eq(friendships.firstUser, id), eq(friendships.secondUser, id)), or((eq(friendships.firstUser, friendId), eq(friendships.secondUser, friendId))))
    })

    const user = await db.query.users.findFirst({
        where: eq(users.id, id)
    })
    const friend = await db.query.users.findFirst({
        where: eq(users.id, friendId)
    })

    if (user && friend && !checkIfAlreadyExists) {
        const friendship = await db.insert(friendships).values({ firstUser: user.id, secondUser: friend.id, status: false }).returning()
        return friendship[0]
    }
    return null
}

export const acceptFriendRequest = async (id: number, userId: number) => {
    const friendship = await db.query.friendships.findFirst({
        where: eq(friendships.id, id)
    })


    if (friendship) {
        if (friendship.secondUser !== userId) {
            throw Error()
        }

        const updatedFriendship = await db.update(friendships)
            .set({ status: true })
            .where(eq(friendships.id, friendship.id)).returning()
        return updatedFriendship[0]
    }

    return null
}

export const rejectFriendRequest = async (id: number, userId: number) => {
    const friendship = await db.query.friendships.findFirst({
        where: eq(friendships.id, id)
    })

    if (friendship) {
        if (friendship.secondUser !== userId) {
            throw Error()
        }


        const deletedFriendship = await db.delete(friendships)
            .where(eq(friendships.id, friendship.id)).returning()
        return deletedFriendship
    }

    return null
}

export const getAllFriendRequests = async (userId: number) => {
    const friendRequests = await db.query.friendships.findMany({
        where: ((friendships, { eq, or, and }) =>
            and(or(eq(friendships.firstUser, userId), eq(friendships.secondUser, userId)), eq(friendships.status, false)))
    })

    return friendRequests
}

export const getAllFriends = async (userId: number) => {
    const friends = await db.query.friendships.findMany({
        where: ((friendships, { eq, or, and }) =>
            and(or(eq(friendships.firstUser, userId), eq(friendships.secondUser, userId)), eq(friendships.status, true)))
    })

    return friends
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