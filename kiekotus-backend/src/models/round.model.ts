import { eq } from "drizzle-orm";
import { db } from "../lib/drizzle";
import { rounds, statisticPlayedCourses } from "../lib/drizzle/schema";
import { RoundType } from "../lib/zod/schemas/round.schema";

export const addRound = async (input: RoundType, userId: number) => {
    const round = await db.insert(rounds)
        .values({ courseId: input.courseId, userId, roundPlayers: JSON.stringify(input.roundPlayers) }).returning()
    const roundId = round[0]
    console.log(roundId)
    return roundId
}

/*export const addPlayedRound = async (input: RoundType, userId: number) => {
    const round = await db.insert(statisticPlayedCourses)
        .values({ courseId: input.courseId, userId, roundPlayers: JSON.stringify(input.roundPlayers) }).returning()
    const roundId = round[0]
    return roundId
} */

export const getAllRounds = async () => {
    const rounds = await db.query.rounds.findMany({})
    return rounds
}

export const getRounds = async (userId: number) => {
    const queriedRounds = await db.query.rounds.findMany({ where: eq(rounds.id, userId) })
    return queriedRounds
}