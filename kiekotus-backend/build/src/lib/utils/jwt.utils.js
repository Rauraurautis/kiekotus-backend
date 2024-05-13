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
exports.reIssueAccessToken = exports.verifyJwt = exports.signJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const lodash_1 = require("lodash");
const user_service_1 = require("../../models/user.service");
const privateKey = process.env.PRIVATE_KEY || "";
const publicKey = process.env.PUBLIC_KEY || "";
const signJWT = (object, options) => {
    return jsonwebtoken_1.default.sign(object, privateKey, Object.assign(Object.assign({}, (options && options)), { algorithm: "RS256" }));
};
exports.signJWT = signJWT;
const verifyJwt = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, publicKey);
        return {
            valid: true,
            expired: false,
            decoded: decoded
        };
    }
    catch (error) {
        return {
            valid: false,
            expired: error.message === "jwt expired",
            decoded: null
        };
    }
};
exports.verifyJwt = verifyJwt;
const reIssueAccessToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const { decoded } = (0, exports.verifyJwt)(refreshToken);
    const userId = (0, lodash_1.get)(decoded === null || decoded === void 0 ? void 0 : decoded.user, "id");
    if (!decoded || !userId) {
        return false;
    }
    let user = yield (0, user_service_1.getSingleUser)(Number(decoded.user.id));
    if (!user)
        return false;
    const accessTokenTtl = "1m";
    const accessToken = (0, exports.signJWT)({ user: { email: user.email, name: user.username, id: user.id } }, { expiresIn: accessTokenTtl });
    return accessToken;
});
exports.reIssueAccessToken = reIssueAccessToken;
