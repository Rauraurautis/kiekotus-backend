"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFriendShipHandler = exports.getAllFriendsHandler = exports.getAllFriendRequestsHandler = exports.rejectFriendRequestHandler = exports.acceptFriendRequestHandler = exports.handleFriendRequestHandler = exports.addFriendHandler = exports.postUserHandler = exports.getAllUsersHandler = exports.getSingleUserHandler = void 0;
const logger_1 = __importDefault(require("../lib/utils/logger"));
const friends_model_1 = require("../models/friends.model");
const user_service_1 = require("../models/user.service");
const getSingleUserHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const user = yield (0, user_service_1.getSingleUser)(id);
        return res.status(200).send(user);
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
});
exports.getSingleUserHandler = getSingleUserHandler;
const getAllUsersHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_service_1.getAllUsers)();
        return res.status(200).send(users);
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
});
exports.getAllUsersHandler = getAllUsersHandler;
const postUserHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_service_1.addUser)(req.body);
        return res.status(200).send(user);
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
});
exports.postUserHandler = postUserHandler;
/* export const editUserHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await editUser(req.params.id)
        return res.status(200).send(user)
    } catch (error) {
        logger.error(error)
        next(error)
    }
} */
/* export const deleteUserHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await deleteUser(req.params.id)
        return res.status(200).send(user)
    } catch (error) {
        logger.error(error)
        next(error)
    }
} */
// Friends
const addFriendHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.name;
        const friendship = yield (0, friends_model_1.addFriend)(Number(req.params.userId), name);
        return res.status(200).send(friendship);
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
});
exports.addFriendHandler = addFriendHandler;
const handleFriendRequestHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const friendship = yield (0, friends_model_1.handleFriendRequest)(Number(req.params.userId), req.body);
        return res.status(200).send(friendship);
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
});
exports.handleFriendRequestHandler = handleFriendRequestHandler;
const acceptFriendRequestHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const friendship = yield (0, friends_model_1.acceptFriendRequest)(Number(req.params.id), res.locals.user.id);
        return res.status(200).send(friendship);
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
});
exports.acceptFriendRequestHandler = acceptFriendRequestHandler;
const rejectFriendRequestHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const friendship = yield (0, friends_model_1.rejectFriendRequest)(Number(req.params.id), res.locals.user.id);
        return res.status(200).send(friendship);
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
});
exports.rejectFriendRequestHandler = rejectFriendRequestHandler;
const getAllFriendRequestsHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const friendships = yield (0, friends_model_1.getAllFriendRequests)(Number(req.params.userId));
        return res.status(200).send(friendships);
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
});
exports.getAllFriendRequestsHandler = getAllFriendRequestsHandler;
const getAllFriendsHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("hi");
        const friendships = yield (0, friends_model_1.getAllFriends)(res.locals.user.id);
        return res.status(200).send(friendships);
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
});
exports.getAllFriendsHandler = getAllFriendsHandler;
const deleteFriendShipHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = res.locals.user.id) !== null && _a !== void 0 ? _a : res.locals.user.user.id;
        const friendship = yield (0, friends_model_1.deleteFriend)(req.body.id, userId);
        return res.status(200).send(friendship);
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
});
exports.deleteFriendShipHandler = deleteFriendShipHandler;
/* Nonregistered players

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
} */
