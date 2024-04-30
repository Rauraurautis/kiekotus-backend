import { eq } from "drizzle-orm";
import { db } from "../lib/drizzle";
import { rounds } from "../lib/drizzle/schema";
import { RoundType } from "../lib/zod/schemas/round.schema";

export const addRound = async (input: RoundType) => {
    const round = await db.insert(rounds).values({ courseId: input.courseId, userId:0,  }).returning()
    const roundId = round[0].id
        return roundId
    
}

export const getAllRounds = async () => {
    const rounds = await db.query.rounds.findMany({})
    return rounds
}

export const getRounds = async (userId: number) => {
    const queriedRounds = await db.query.rounds.findMany({where: eq(rounds.id, userId)})
    return queriedRounds
}