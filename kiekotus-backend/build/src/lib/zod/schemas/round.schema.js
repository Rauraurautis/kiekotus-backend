"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoundSchema = void 0;
const zod_1 = require("zod");
const playerSchema = (0, zod_1.object)({
    name: (0, zod_1.string)(),
    id: (0, zod_1.union)([zod_1.z.string(), zod_1.z.number()])
});
const roundPlayerSchema = (0, zod_1.object)({
    player: playerSchema,
    scores: (0, zod_1.array)((0, zod_1.number)())
});
exports.createRoundSchema = (0, zod_1.object)({
    courseId: (0, zod_1.number)({ required_error: "Enter course id" }),
    courseName: (0, zod_1.string)({ required_error: "Course name required" }),
    roundPlayers: (0, zod_1.array)(roundPlayerSchema)
});
