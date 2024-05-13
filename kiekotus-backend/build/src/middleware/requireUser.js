"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireUser = void 0;
const requireUser = (req, res, next) => {
    const user = res.locals.user;
    console.log(user);
    if (!user) {
        return res.status(403).end();
    }
    return next();
};
exports.requireUser = requireUser;
