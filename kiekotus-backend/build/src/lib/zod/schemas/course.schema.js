"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourseSchema = exports.createHoleSchema = void 0;
const zod_1 = require("zod");
const latitudeRegex = /^(-?\d{1,2}(?:\.\d+)?|[-+]?[1-8]?\d{1}(?:\.\d+)?)$/;
const longitudeRegex = /^(-?\d{1,3}(?:\.\d+)?|[-+]?(?:1[0-7]|[1-9])?\d{1}(?:\.\d+)?)$/;
const difficulties = ["AAA1", "AA2", "AA1", "A3", "BB1", "B2", "C1", "D1", "C3", "B1"];
exports.createHoleSchema = (0, zod_1.object)({
    distance: (0, zod_1.number)(),
    par: (0, zod_1.number)({ required_error: "Par is required" }).min(1).max(10),
});
exports.createCourseSchema = (0, zod_1.object)({
    name: (0, zod_1.string)({ required_error: "Need to add course name" })
        .min(2, "Too short name for course"),
    latitude: (0, zod_1.string)({ required_error: "Latitude required" })
        .regex(new RegExp(latitudeRegex), "Incorrect latitude format"),
    longitude: (0, zod_1.string)({ required_error: "Longitude required" })
        .regex(new RegExp(longitudeRegex), "Incorrect longitude format"),
    difficulty: (0, zod_1.string)()
        .refine(val => difficulties.includes(val), { message: "Incorrect difficulty" }).optional(),
    address: (0, zod_1.string)({ required_error: "Address required" }).min(5, "Too short address"),
    description: (0, zod_1.string)(),
    holes: (0, zod_1.array)(exports.createHoleSchema)
});
