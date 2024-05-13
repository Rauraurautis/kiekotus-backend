"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNonregisteredPlayerSchema = exports.createUserSchema = exports.findIdSchema = void 0;
const zod_1 = require("zod");
exports.findIdSchema = (0, zod_1.object)({ id: (0, zod_1.string)().refine(val => !isNaN(Number(val))) });
exports.createUserSchema = (0, zod_1.object)({
    username: (0, zod_1.string)({ required_error: "Name required" })
        .min(2, { message: "Minimum length 2 characters" }),
    email: (0, zod_1.string)({ required_error: "Email required" })
        .email(),
    password: (0, zod_1.string)({ required_error: "Password required" })
        .min(4, { message: "Minimum length 4 characters" }),
    confirmPassword: (0, zod_1.string)({ required_error: "Confirm password required" })
});
exports.createNonregisteredPlayerSchema = (0, zod_1.object)({
    name: (0, zod_1.string)({ required_error: "Name required" })
        .min(2, { message: "Minimum length 2 characters" }),
});
