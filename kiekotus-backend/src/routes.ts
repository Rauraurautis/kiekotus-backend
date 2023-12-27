import { Express, Request, Response } from "express"
import { getAllCoursesHandler, getSingleCourseHandler, postCourseHandler, postHoleHandler } from "./controllers/course.controller"

import { createCourseSchema, createHoleSchema } from "./lib/zod/schemas/course.schema"
import { validateBody, validateParams } from "./middleware/validateResource"
import { createNonregisteredPlayerSchema, createUserSchema, findIdSchema } from "./lib/zod/schemas/user.schema"
import {
    acceptFriendRequestHandler, addFriendHandler, getAllFriendsHandler, getAllNonRegisteredPlayersHandler, getAllUsersHandler,
    postNonRegisteredPlayerHandler,
    postUserHandler, rejectFriendRequestHandler
} from "./controllers/user.controller"
import { createSessionSchema } from "./lib/zod/schemas/session.schema"
import { postUserSessionHandler } from "./controllers/session.controller"
import { requireUser } from "./middleware/requireUser"
import { getUserStatisticsHandler, postNewPlayedCourseHandler } from "./controllers/statistics.controller"
import { addPlayedCourseSchema } from "./lib/zod/schemas/statistics.schema"
import { getRoundsHandler, postRoundHandler } from "./controllers/round.controller"
import { createRoundSchema } from "./lib/zod/schemas/round.schema"

const routes = (app: Express) => {

    app.get("/healthcheck", (req: Request, res: Response) => {
        return res.json({ status: "OK" })
    })

    app.get("/csrf-token", (req: Request, res: Response) => {
        return res.json({ csrfToken: req.csrfToken() })
    })

    // Sessions
    app.post("/api/sessions", validateBody(createSessionSchema), postUserSessionHandler)

    // Courses
    app.get("/api/courses/:id", validateParams(findIdSchema), getSingleCourseHandler)
    app.get("/api/courses", getAllCoursesHandler)
    app.post("/api/courses", validateBody(createCourseSchema), postCourseHandler)
    app.delete("/api/courses/:id") //TODO

    // Holes
    app.post("/api/courses/:id", requireUser, validateParams(findIdSchema), validateBody(createHoleSchema), postHoleHandler)
    app.put("/api/courses/:id/:holeId", requireUser, validateParams(findIdSchema), validateBody(createHoleSchema), postHoleHandler) // TODO

    // Rounds
    app.get("/api/rounds", requireUser, getRoundsHandler)
    app.post("/api/rounds", requireUser, validateBody(createRoundSchema), postRoundHandler)

    // Users
    app.get("/api/users/:id", validateParams(findIdSchema), getAllUsersHandler)
    app.get("/api/users", getAllUsersHandler)
    app.post("/api/users", validateBody(createUserSchema), postUserHandler)
    app.delete("/api/users/:id") //TODO

    // Statistics
    app.get("/api/statistics", requireUser, getUserStatisticsHandler)
    app.post("/api/statistics/played-courses", requireUser, validateBody(addPlayedCourseSchema), postNewPlayedCourseHandler)

    // Nonregistered friends
    app.get("/api/nonregistered-friends", requireUser, getAllNonRegisteredPlayersHandler)
    app.post("/api/nonregistered-friends", requireUser, validateBody(createNonregisteredPlayerSchema), postNonRegisteredPlayerHandler)

    // Friendships 
    app.post("/api/friend-requests/:id", requireUser, validateParams(findIdSchema), addFriendHandler)
    app.put("/api/friend-requests/:id/accept", requireUser, validateParams(findIdSchema), acceptFriendRequestHandler)
    app.put("/api/friend-requests/:id/reject", requireUser, validateParams(findIdSchema), rejectFriendRequestHandler)
    app.get("/api/friend-requests", requireUser, getAllFriendsHandler) // User's friend requests
    app.get("/api/friendships", requireUser, getAllFriendsHandler)
}

export default routes