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
exports.validatePassword = exports.loginUser = exports.addUser = exports.getAllUsers = exports.getSingleUser = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const drizzle_1 = require("../lib/drizzle");
const schema_1 = require("../lib/drizzle/schema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_utils_1 = require("../lib/utils/jwt.utils");
const AppError_1 = require("../lib/utils/AppError");
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield drizzle_1.db.query.users.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.users.id, id), columns: {
            password: false
        }
    });
    return user;
});
exports.getSingleUser = getSingleUser;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield drizzle_1.db.query.users.findMany({
        columns: {
            password: false
        }
    });
    return users;
});
exports.getAllUsers = getAllUsers;
const addUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, confirmPassword } = input;
    if (password !== confirmPassword)
        throw Error();
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const user = yield drizzle_1.db.insert(schema_1.users).values(Object.assign(Object.assign({}, input), { password: hashedPassword, role: "user" })).returning();
    const userStatistics = yield drizzle_1.db.insert(schema_1.statistics).values({ userId: user[0].id });
    console.log(userStatistics);
    return user[0];
});
exports.addUser = addUser;
const loginUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, exports.validatePassword)(input);
    if (!user) {
        throw new AppError_1.AppError("Wrong password!", 401, 401);
    }
    const accessToken = (0, jwt_utils_1.signJWT)({ user: { email: user.email, name: user.username, id: user.id } }, { expiresIn: "1m" });
    const refreshToken = (0, jwt_utils_1.signJWT)({ user: { email: user.email, name: user.username, id: user.id } }, { expiresIn: "30d" });
    return { accessToken, refreshToken };
});
exports.loginUser = loginUser;
const validatePassword = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield drizzle_1.db.query.users.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.users.email, input.email)
    });
    if (!user || !user.password) {
        return false;
    }
    const passwordMatch = yield bcrypt_1.default.compare(input.password, user.password);
    if (!passwordMatch) {
        return false;
    }
    return user;
});
exports.validatePassword = validatePassword;
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
