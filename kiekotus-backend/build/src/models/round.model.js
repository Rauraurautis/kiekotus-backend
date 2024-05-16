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
exports.getRounds = exports.getAllRounds = exports.addRound = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const drizzle_1 = require("../lib/drizzle");
const schema_1 = require("../lib/drizzle/schema");
const addRound = (input, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const round = yield drizzle_1.db.insert(schema_1.rounds)
        .values({ courseId: input.courseId, userId, roundPlayers: JSON.stringify(input.roundPlayers) }).returning();
    const roundId = round[0];
    console.log(roundId);
    return roundId;
});
exports.addRound = addRound;
/*export const addPlayedRound = async (input: RoundType, userId: number) => {
    const round = await db.insert(statisticPlayedCourses)
        .values({ courseId: input.courseId, userId, roundPlayers: JSON.stringify(input.roundPlayers) }).returning()
    const roundId = round[0]
    return roundId
} */
const getAllRounds = () => __awaiter(void 0, void 0, void 0, function* () {
    const rounds = yield drizzle_1.db.query.rounds.findMany({});
    return rounds;
});
exports.getAllRounds = getAllRounds;
const getRounds = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const queriedRounds = yield drizzle_1.db.query.rounds.findMany({
        where: (0, drizzle_orm_1.eq)(schema_1.rounds.userId, userId),
        with: { course: { columns: { name: true } } }
    });
    return queriedRounds;
});
exports.getRounds = getRounds;
