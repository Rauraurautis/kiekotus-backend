"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const course_controller_1 = require("./controllers/course.controller");
const course_schema_1 = require("./lib/zod/schemas/course.schema");
const validateResource_1 = require("./middleware/validateResource");
const user_schema_1 = require("./lib/zod/schemas/user.schema");
const user_controller_1 = require("./controllers/user.controller");
const session_schema_1 = require("./lib/zod/schemas/session.schema");
const session_controller_1 = require("./controllers/session.controller");
const requireUser_1 = require("./middleware/requireUser");
const statistics_controller_1 = require("./controllers/statistics.controller");
const statistics_schema_1 = require("./lib/zod/schemas/statistics.schema");
const round_controller_1 = require("./controllers/round.controller");
const round_schema_1 = require("./lib/zod/schemas/round.schema");
const logger_1 = __importDefault(require("./lib/utils/logger"));
const parseStringfied_1 = require("./middleware/parseStringfied");
const handleTokenRefresh_1 = require("./lib/handleTokenRefresh");
const requireAdmin_1 = require("./middleware/requireAdmin");
const routes = (app) => {
    app.get("/healthcheck", (req, res) => {
        logger_1.default.info("Health checked");
        return res.json({ status: "OK" });
    });
    app.get("/csrf-token", (req, res) => {
        return res.json({ csrfToken: req.csrfToken() });
    });
    app.get("/refresh", handleTokenRefresh_1.handleTokenRefresh);
    app.post("/api/login", (0, validateResource_1.validateBody)(session_schema_1.createSessionSchema), session_controller_1.loginHandler);
    // Courses
    app.get("/api/courses/:id", (0, validateResource_1.validateParams)(user_schema_1.findIdSchema), course_controller_1.getSingleCourseHandler);
    app.get("/api/courses", course_controller_1.getAllCoursesHandler);
    app.post("/api/courses", requireAdmin_1.requireAdmin, parseStringfied_1.parseStringified, (0, validateResource_1.validateBody)(course_schema_1.createCourseSchema), course_controller_1.postCourseHandler);
    app.delete("/api/courses/:id", requireAdmin_1.requireAdmin, course_controller_1.deleteCourseHandler);
    // Holes
    app.post("/api/courses/:id", requireUser_1.requireUser, (0, validateResource_1.validateParams)(user_schema_1.findIdSchema), (0, validateResource_1.validateBody)(course_schema_1.createHoleSchema), course_controller_1.postHoleHandler);
    app.put("/api/courses/:id/:holeId", requireUser_1.requireUser, (0, validateResource_1.validateParams)(user_schema_1.findIdSchema), (0, validateResource_1.validateBody)(course_schema_1.createHoleSchema), course_controller_1.postHoleHandler); // TODO
    // Rounds
    /* app.get("/api/rounds/", getallRoundsHandler) */ // TODO
    app.get("/api/users/:userId/rounds", requireUser_1.requireUser, round_controller_1.getRoundsHandler); // Korjaa Id:llä haku
    app.delete("/api/users/:userId/rounds/:roundId", requireUser_1.requireUser, round_controller_1.getRoundsHandler); // TODO
    app.post("/api/users/:userId/rounds", requireUser_1.requireUser, (0, validateResource_1.validateBody)(round_schema_1.createRoundSchema), round_controller_1.postRoundHandler);
    // Users
    app.get("/api/users", user_controller_1.getAllUsersHandler);
    app.post("/api/users", (0, validateResource_1.validateBody)(user_schema_1.createUserSchema), user_controller_1.postUserHandler);
    app.put("/api/users/:id"); //TODO
    app.delete("/api/users/:id", requireAdmin_1.requireAdmin); //TODO
    app.get("/api/users/:id", (0, validateResource_1.validateParams)(user_schema_1.findIdSchema), user_controller_1.getAllUsersHandler); // TODO
    // Statistics
    app.get("/api/users/:id/statistics", statistics_controller_1.getUserStatisticsHandler);
    app.post("/api/users/:id/statistics/played-courses", requireUser_1.requireUser, (0, validateResource_1.validateBody)(statistics_schema_1.addPlayedCourseSchema), statistics_controller_1.postNewPlayedCourseHandler);
    // app.delete("/api/users/:id/statistics/played-courses/:courseId", requireUser, deletePlayedCourseHandler)
    // Nonregistered friends
    // Friendships 
    app.post("/api/users/:userId/friend-requests", requireUser_1.requireUser, user_controller_1.addFriendHandler);
    app.put("/api/users/:userId/friend-requests", requireUser_1.requireUser, user_controller_1.handleFriendRequestHandler);
    app.get("/api/users/:userId/friend-requests", requireUser_1.requireUser, user_controller_1.getAllFriendRequestsHandler); // User's friend requests
    app.get("/api/users/:userId/friendships", requireUser_1.requireUser, user_controller_1.getAllFriendsHandler);
    app.delete("/api/users/:userId/friendships", requireUser_1.requireUser, user_controller_1.deleteFriendShipHandler);
};
exports.default = routes;
