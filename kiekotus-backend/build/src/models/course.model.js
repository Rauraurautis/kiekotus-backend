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
exports.addHole = exports.deleteCourse = exports.addCourse = exports.getAllCourses = exports.getSingleCourse = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const drizzle_1 = require("../lib/drizzle");
const schema_1 = require("../lib/drizzle/schema");
const getSingleCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield drizzle_1.db.query.courses.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.courses.id, id), with: { holes: { columns: { distance: true, par: true } } }
    });
    return course ? course : "No course found with that id";
});
exports.getSingleCourse = getSingleCourse;
const getAllCourses = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield drizzle_1.db.query.courses.findMany();
});
exports.getAllCourses = getAllCourses;
const addCourse = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield drizzle_1.db.insert(schema_1.courses).values(input).returning();
    if (input.holes) {
        for (let hole of input.holes) {
            yield (0, exports.addHole)(hole, course[0].id);
        }
    }
    return course[0];
});
exports.addCourse = addCourse;
const deleteCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield drizzle_1.db.delete(schema_1.courses).where(((0, drizzle_orm_1.eq)(schema_1.courses.id, Number(id)))).returning();
    return course[0];
});
exports.deleteCourse = deleteCourse;
const addHole = (input, courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const hole = yield drizzle_1.db.insert(schema_1.holes).values(Object.assign(Object.assign({}, input), { courseId })).returning();
    return hole[0];
});
exports.addHole = addHole;
