"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPlayedCourseSchema = void 0;
const zod_1 = require("zod");
exports.addPlayedCourseSchema = (0, zod_1.object)({
    courseId: (0, zod_1.number)(),
    date: (0, zod_1.string)().default("")
});
