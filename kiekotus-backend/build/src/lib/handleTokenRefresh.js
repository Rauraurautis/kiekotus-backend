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
exports.handleTokenRefresh = void 0;
const jwt_utils_1 = require("./utils/jwt.utils");
const logger_1 = __importDefault(require("./utils/logger"));
const handleTokenRefresh = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = req.cookies["refreshToken"];
        const newAccessToken = yield (0, jwt_utils_1.reIssueAccessToken)(refreshToken);
        if (newAccessToken) {
            return res.status(200).send({ accessToken: newAccessToken });
        }
        return res.status(400).send({ message: "No proper refresh token provided" });
    }
    catch (error) {
        logger_1.default.error(error);
    }
});
exports.handleTokenRefresh = handleTokenRefresh;
