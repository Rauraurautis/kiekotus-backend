import { and, eq, or } from "drizzle-orm";
import { db } from "../lib/drizzle";
import { friendships, users } from "../lib/drizzle/schema";




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

