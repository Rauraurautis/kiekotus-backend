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
exports.addNewPlayedCourse = exports.getUserStatistics = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const drizzle_1 = require("../lib/drizzle");
const schema_1 = require("../lib/drizzle/schema");
const getUserStatistics = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const stats = yield drizzle_1.db.query.statistics.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.statistics.userId, userId), columns: { favCourse: true, id: true }, with: { playedCourses: { with: { course: { columns: { name: true } } } } }
    });
    return stats;
});
exports.getUserStatistics = getUserStatistics;
const addNewPlayedCourse = (userId, input) => __awaiter(void 0, void 0, void 0, function* () {
    const userStatistics = yield drizzle_1.db.query.statistics.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.statistics.userId, userId)
    });
    if (userStatistics && !input.date) {
        const playedCourses = yield drizzle_1.db.insert(schema_1.statisticPlayedCourses)
            .values({ courseId: input.courseId, statisticsId: userStatistics.id });
        return playedCourses;
    }
    throw Error();
});
exports.addNewPlayedCourse = addNewPlayedCourse;
