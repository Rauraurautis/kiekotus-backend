import { Express, Request, Response } from "express"
import { deleteCourseHandler, getAllCoursesHandler, getSingleCourseHandler, postCourseHandler, postHoleHandler } from "./controllers/course.controller"

import { createCourseSchema, createHoleSchema } from "./lib/zod/schemas/course.schema"
import { validateBody, validateParams } from "./middleware/validateResource"
import { createUserSchema, findIdSchema } from "./lib/zod/schemas/user.schema"
import {
    acceptFriendRequestHandler, addFriendHandler, deleteFriendShipHandler, getAllFriendRequestsHandler, getAllFriendsHandler, getAllUsersHandler,
    handleFriendRequestHandler,
    postUserHandler, rejectFriendRequestHandler
} from "./controllers/user.controller"
import { createSessionSchema } from "./lib/zod/schemas/session.schema"
import { loginHandler } from "./controllers/session.controller"
import { requireUser } from "./middleware/requireUser"
import { getUserStatisticsHandler, postNewPlayedCourseHandler } from "./controllers/statistics.controller"
import { addPlayedCourseSchema } from "./lib/zod/schemas/statistics.schema"
import { getRoundsHandler, postRoundHandler } from "./controllers/round.controller"
import { createRoundSchema } from "./lib/zod/schemas/round.schema"
import logger from "./lib/utils/logger"
import { parseStringified } from "./middleware/parseStringfied"
import { handleTokenRefresh } from "./lib/handleTokenRefresh"
import { requireAdmin } from "./middleware/requireAdmin"

const routes = (app: Express) => {

    app.get("/healthcheck", (req: Request, res: Response) => {
        logger.info("Health checked")
        return res.json({ status: "OK" })
    })

    app.get("/refresh", handleTokenRefresh)


    app.post("/api/login", validateBody(createSessionSchema), loginHandler)

    // Courses
    app.get("/api/courses/:id", validateParams(findIdSchema), getSingleCourseHandler)
    app.get("/api/courses", getAllCoursesHandler)
    app.post("/api/courses", requireAdmin, parseStringified, validateBody(createCourseSchema), postCourseHandler)
    app.delete("/api/courses/:id", requireAdmin, deleteCourseHandler)

    // Holes
    app.post("/api/courses/:id", requireUser, validateParams(findIdSchema), validateBody(createHoleSchema), postHoleHandler)
    app.put("/api/courses/:id/:holeId", requireUser, validateParams(findIdSchema), validateBody(createHoleSchema), postHoleHandler) // TODO

    // Rounds
    /* app.get("/api/rounds/", getallRoundsHandler) */ // TODO
    app.get("/api/users/:userId/rounds", requireUser, getRoundsHandler) // Korjaa Id:llä haku
    app.delete("/api/users/:userId/rounds/:roundId", requireUser, getRoundsHandler) // TODO
    app.post("/api/users/:userId/rounds", requireUser, validateBody(createRoundSchema), postRoundHandler)

    // Users
    app.get("/api/users", getAllUsersHandler)
    app.post("/api/users", validateBody(createUserSchema), postUserHandler)
    app.put("/api/users/:id") //TODO
    app.delete("/api/users/:id", requireAdmin) //TODO
    app.get("/api/users/:id", validateParams(findIdSchema), getAllUsersHandler) // TODO

    // Statistics
    app.get("/api/users/:id/statistics", getUserStatisticsHandler)
    app.post("/api/users/:id/statistics/played-courses", requireUser, validateBody(addPlayedCourseSchema), postNewPlayedCourseHandler)
    // app.delete("/api/users/:id/statistics/played-courses/:courseId", requireUser, deletePlayedCourseHandler)
    // Nonregistered friends


    // Friendships 
    app.post("/api/users/:userId/friend-requests", requireUser, addFriendHandler)
    app.put("/api/users/:userId/friend-requests", requireUser, handleFriendRequestHandler)
    app.get("/api/users/:userId/friend-requests", requireUser, getAllFriendRequestsHandler) // User's friend requests
    app.get("/api/users/:userId/friendships", requireUser, getAllFriendsHandler)
    app.delete("/api/users/:userId/friendships", requireUser, deleteFriendShipHandler)
}



export default routes