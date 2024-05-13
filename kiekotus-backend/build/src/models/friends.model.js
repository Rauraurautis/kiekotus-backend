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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFriends = exports.getAllFriendRequests = exports.handleFriendRequest = exports.rejectFriendRequest = exports.acceptFriendRequest = exports.deleteFriend = exports.addFriend = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const drizzle_1 = require("../lib/drizzle");
const schema_1 = require("../lib/drizzle/schema");
const AppError_1 = require("../lib/utils/AppError");
const addFriend = (id, name) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield drizzle_1.db.query.users.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.users.username, name)
    });
    if (!user)
        throw new AppError_1.AppError("No user with that name found!", 404, 404);
    const checkIfAlreadyExists = yield drizzle_1.db.query.friendships.findFirst({
        where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.or)((0, drizzle_orm_1.eq)(schema_1.friendships.firstUser, id), (0, drizzle_orm_1.eq)(schema_1.friendships.secondUser, id)), (0, drizzle_orm_1.or)(((0, drizzle_orm_1.eq)(schema_1.friendships.firstUser, user.id), (0, drizzle_orm_1.eq)(schema_1.friendships.secondUser, user.id))))
    });
    if (checkIfAlreadyExists)
        throw new AppError_1.AppError("Friend request already sent!", 400, 400);
    if (!checkIfAlreadyExists) {
        const friendship = yield drizzle_1.db.insert(schema_1.friendships).values({ firstUser: id, secondUser: user.id, status: false }).returning();
        return friendship[0];
    }
    return null;
});
exports.addFriend = addFriend;
const deleteFriend = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const friendship = yield drizzle_1.db.query.friendships.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.friendships.id, id)
    });
    if (friendship) {
        if (friendship.secondUser !== userId && friendship.firstUser !== userId) {
            throw new AppError_1.AppError("Wrong user!", 400, 400);
        }
    }
    const deletedFriendship = yield drizzle_1.db.delete(schema_1.friendships)
        .where((0, drizzle_orm_1.eq)(schema_1.friendships.id, id)).returning();
    return deletedFriendship;
});
exports.deleteFriend = deleteFriend;
const acceptFriendRequest = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const friendship = yield drizzle_1.db.query.friendships.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.friendships.id, id)
    });
    if (friendship) {
        if (friendship.secondUser !== userId) {
            throw Error();
        }
        const updatedFriendship = yield drizzle_1.db.update(schema_1.friendships)
            .set({ status: true })
            .where((0, drizzle_orm_1.eq)(schema_1.friendships.id, friendship.id)).returning();
        return updatedFriendship[0];
    }
    return null;
});
exports.acceptFriendRequest = acceptFriendRequest;
const rejectFriendRequest = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const friendship = yield drizzle_1.db.query.friendships.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.friendships.id, id)
    });
    if (friendship) {
        if (friendship.secondUser !== userId) {
            throw Error();
        }
        const deletedFriendship = yield drizzle_1.db.delete(schema_1.friendships)
            .where((0, drizzle_orm_1.eq)(schema_1.friendships.id, friendship.id)).returning();
        return deletedFriendship;
    }
    return null;
});
exports.rejectFriendRequest = rejectFriendRequest;
const handleFriendRequest = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, accept } = data;
    if (!accept) {
        (0, exports.rejectFriendRequest)(id, userId);
    }
    else {
        (0, exports.acceptFriendRequest)(id, userId);
    }
});
exports.handleFriendRequest = handleFriendRequest;
const getAllFriendRequests = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const friendRequests = yield drizzle_1.db.query.friendships.findMany({
        where: ((friendships, { eq, or, and }) => and(eq(friendships.secondUser, userId), eq(friendships.status, false))), with: {
            firstUser: { columns: { username: true } }
        }
    });
    return friendRequests;
});
exports.getAllFriendRequests = getAllFriendRequests;
const getAllFriends = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const friends = yield drizzle_1.db.query.friendships.findMany({
        where: ((friendships, { eq, or, and }) => and(or(eq(friendships.firstUser, userId), eq(friendships.secondUser, userId)), eq(friendships.status, true))),
        with: {
            firstUser: { columns: { username: true } }, secondUser: { columns: { username: true } },
        }
    });
    return friends;
});
exports.getAllFriends = getAllFriends;
