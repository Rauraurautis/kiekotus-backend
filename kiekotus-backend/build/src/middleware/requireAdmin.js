"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = void 0;
const requireAdmin = (req, res, next) => {
    const user = res.locals.user;
    if (user.role !== "admin") {
        return res.status(403).end();
    }
    return next();
};
exports.requireAdmin = requireAdmin;
