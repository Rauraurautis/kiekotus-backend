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
exports.loginHandler = void 0;
const user_service_1 = require("../models/user.service");
const loginHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokens = yield (0, user_service_1.loginUser)(req.body);
        return res.cookie("refreshToken", tokens.refreshToken, { httpOnly: true })
            .send({ accessToken: tokens.accessToken });
    }
    catch (error) {
        next(error);
    }
});
exports.loginHandler = loginHandler;
/*
export const getUserSessionsHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = res.locals.user._id
        const sessions = await findSessions({ user: userId })
        return res.send(sessions)
    } catch (error: any) {
        logger.error(error)
        return next(error)
    }
}

export const deleteSessionHandler = async (req: Request, res: Response, next: NextFunction) => {
    const sessionId = res.locals.user.session
    await updateSession({ _id: sessionId }, { valid: false })
    return res.send({
        accessToken: null,
        refreshToken: null
    })
} */ 
