import { NextFunction, Request, Response } from "express"
import logger from "../lib/utils/logger"
import { addCourse, getAllCourses, getSingleCourse } from "../services/course.service"
import { omit } from "lodash"
import {
    acceptFriendRequest, addFriend, addNonregisteredPlayer,
    addUser, getAllFriendRequests, getAllFriends, getAllNonregisteredPlayers, getAllUsers, getSingleUser, rejectFriendRequest
} from "../services/user.service"

export const getSingleUserHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.params)
        const id = Number(req.params.id)
        const user = await getSingleUser(id)
        return res.status(200).send(user)
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const getAllUsersHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getAllUsers()
        return res.status(200).send(users)
    } catch (error) {
        logger.error(error)
        next(error)
    }
}


export const postUserHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await addUser(req.body)
        return res.status(200).send(user)
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

// Friends

export const addFriendHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const friendship = await addFriend(res.locals.user.id, Number(req.params.id))
        return res.status(200).send(friendship)
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const acceptFriendRequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const friendship = await acceptFriendRequest(Number(req.params.id), res.locals.user.id)
        return res.status(200).send(friendship)
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const rejectFriendRequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const friendship = await rejectFriendRequest(Number(req.params.id), res.locals.user.id)
        return res.status(200).send(friendship)
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const getAllFriendRequestsHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const friendships = await getAllFriendRequests(res.locals.user.id)
        return res.status(200).send(friendships)
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const getAllFriendsHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const friendships = await getAllFriends(res.locals.user.id)
        return res.status(200).send(friendships)
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

// Nonregistered players

export const postNonRegisteredPlayerHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const nonregisteredPlayer = await addNonregisteredPlayer(req.body, res.locals.user.id)
        return res.status(200).send(nonregisteredPlayer)
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const getAllNonRegisteredPlayersHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const nonregisteredPlayer = await getAllNonregisteredPlayers(res.locals.user.id)
        return res.status(200).send(nonregisteredPlayer)
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

