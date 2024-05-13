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
exports.deserializeUser = void 0;
const lodash_1 = require("lodash");
const jwt_utils_1 = require("../lib/utils/jwt.utils");
const deserializeUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const accessToken = (_a = (0, lodash_1.get)(req, "headers.authorization")) === null || _a === void 0 ? void 0 : _a.slice(7);
    const refreshToken = req.cookies["refreshToken"];
    if (!accessToken) {
        return next();
    }
    const { decoded, expired } = (0, jwt_utils_1.verifyJwt)(accessToken);
    if (decoded) {
        const { user } = decoded;
        res.locals.user = user;
        return next();
    }
    if (expired && refreshToken) {
        const newAccessToken = yield (0, jwt_utils_1.reIssueAccessToken)(refreshToken);
        if (newAccessToken) {
            res.setHeader("x-access-token", newAccessToken);
            const result = (0, jwt_utils_1.verifyJwt)(newAccessToken);
            const { user } = result.decoded;
            res.locals.user = user;
            return next();
        }
        return next();
    }
    return next();
});
exports.deserializeUser = deserializeUser;
