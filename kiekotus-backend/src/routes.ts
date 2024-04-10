import { Express, Request, Response } from "express"
import { getAllCoursesHandler, getSingleCourseHandler, postCourseHandler, postHoleHandler } from "./controllers/course.controller"

import { createCourseSchema, createHoleSchema } from "./lib/zod/schemas/course.schema"
import { validateBody, validateParams } from "./middleware/validateResource"
import { createUserSchema, findIdSchema } from "./lib/zod/schemas/user.schema"
import {
    acceptFriendRequestHandler, addFriendHandler, getAllFriendRequestsHandler, getAllFriendsHandler, getAllUsersHandler,
    postUserHandler, rejectFriendRequestHandler
} from "./controllers/user.controller"
import { createSessionSchema } from "./lib/zod/schemas/session.schema"
import { postUserSessionHandler } from "./controllers/session.controller"
import { requireUser } from "./middleware/requireUser"
import { getUserStatisticsHandler, postNewPlayedCourseHandler } from "./controllers/statistics.controller"
import { addPlayedCourseSchema } from "./lib/zod/schemas/statistics.schema"
import { getRoundsHandler, postRoundHandler } from "./controllers/round.controller"
import { createRoundSchema } from "./lib/zod/schemas/round.schema"
import logger from "./lib/utils/logger"
import { parseStringified } from "./middleware/parseStringfied"
import { handleTokenRefresh } from "./lib/handleTokenRefresh"

const routes = (app: Express) => {

    app.get("/healthcheck", (req: Request, res: Response) => {
        logger.info("Health checked")
        return res.json({ status: "OK" })
    })

    app.get("/csrf-token", (req: Request, res: Response) => {
        return res.json({ csrfToken: req.csrfToken() })
    })

    app.get("/refresh", handleTokenRefresh)

    // Sessions
    app.post("/api/sessions", validateBody(createSessionSchema), postUserSessionHandler)

    // Courses
    app.get("/api/courses/:id", validateParams(findIdSchema), getSingleCourseHandler)
    app.get("/api/courses", getAllCoursesHandler)
    app.post("/api/courses", requireUser, parseStringified, validateBody(createCourseSchema), postCourseHandler)
    app.delete("/api/courses/:id") //TODO

    // Holes
    app.post("/api/courses/:id", requireUser, validateParams(findIdSchema), validateBody(createHoleSchema), postHoleHandler)
    app.put("/api/courses/:id/:holeId", requireUser, validateParams(findIdSchema), validateBody(createHoleSchema), postHoleHandler) // TODO

    // Rounds
    /* app.get("/api/rounds/", getallRoundsHandler) */ // TODO
    app.get("/api/rounds/:userId", requireUser, getRoundsHandler) // Korjaa Id:llä haku
    app.delete("/api/rounds/:id", requireUser, getRoundsHandler) // TODO
    app.post("/api/rounds", requireUser, validateBody(createRoundSchema), postRoundHandler)

    // Users
    app.get("/api/users", getAllUsersHandler)
    app.post("/api/users", validateBody(createUserSchema), postUserHandler)
    app.put("/api/users/:id") //TODO
    app.delete("/api/users/:id") //TODO
    app.get("/api/users/:id", validateParams(findIdSchema), getAllUsersHandler) // TODO

    // Statistics
    app.post("/api/statistics/played-courses", requireUser, validateBody(addPlayedCourseSchema), postNewPlayedCourseHandler)
    /* GET	/api/users/:id/played-courses	Tietyn pelaajan pelattujen ratojen haku käyttäjäid:llä
   POST	/api/users/:id/played-courses	Pelatun radan lisäys tietylle pelaajalle käyttäjäid:llä
   DELETE	/api/users/:id/played-courses/:courseId	Pelatun radan poistaminen pelatuista radoista id:llä
    */
    // Nonregistered friends


    // Friendships 
    app.post("/api/:userId/friend-requests", requireUser, validateParams(findIdSchema), addFriendHandler)
    app.put("/api/:userId/friend-requests/:id", requireUser, validateParams(findIdSchema), /* handleFriendRequestHandler */)
    app.get("/api/:userId/friend-requests", requireUser, getAllFriendRequestsHandler) // User's friend requests
    app.get("/api/:userId/friendships", requireUser, getAllFriendsHandler)
}

export default routes