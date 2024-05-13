import { and, eq, or } from "drizzle-orm";
import { db } from "../lib/drizzle";
import { friendships, users } from "../lib/drizzle/schema";
import { AppError } from "../lib/utils/AppError";




export const addFriend = async (id: number, name: string) => {
    const user = await db.query.users.findFirst({
        where: eq(users.username, name)
    })

    if (!user) throw new AppError("No user with that name found!", 404, 404)

    const checkIfAlreadyExists = await db.query.friendships.findFirst({
        where: and(or(eq(friendships.firstUser, id), eq(friendships.secondUser, id)), or((eq(friendships.firstUser, user.id), eq(friendships.secondUser, user.id))))
    })

    if (checkIfAlreadyExists) throw new AppError("Friend request already sent!", 400, 400)

    if (!checkIfAlreadyExists) {
        const friendship = await db.insert(friendships).values({ firstUser: id, secondUser: user.id, status: false }).returning()
        return friendship[0]
    }
    return null
}

export const deleteFriend = async (id: number, userId: number) => {
    const friendship = await db.query.friendships.findFirst({
        where: eq(friendships.id, id)
    })

    if (friendship) {
        if (friendship.secondUser !== userId && friendship.firstUser !== userId) {
            throw new AppError("Wrong user!", 400, 400)
        }
    }

    const deletedFriendship = await db.delete(friendships)
        .where(eq(friendships.id, id)).returning()
    return deletedFriendship
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

export const handleFriendRequest = async (userId: number, data: { id: number, accept: boolean }) => {
    const { id, accept } = data

    if (!accept) {
        rejectFriendRequest(id, userId)
    } else {
        acceptFriendRequest(id, userId)
    }
}


export const getAllFriendRequests = async (userId: number) => {
    const friendRequests = await db.query.friendships.findMany({
        where: ((friendships, { eq, or, and }) =>
            and(eq(friendships.secondUser, userId), eq(friendships.status, false))), with: {
                firstUser: { columns: { username: true } }
            }
    })

    return friendRequests
}

export const getAllFriends = async (userId: number) => {
    const friends = await db.query.friendships.findMany({
        where: ((friendships, { eq, or, and }) =>
            and(or(eq(friendships.firstUser, userId), eq(friendships.secondUser, userId)), eq(friendships.status, true)))
        , with: {
            firstUser: { columns: { username: true } }, secondUser: { columns: { username: true } },
        }


    })
    return friends
}

