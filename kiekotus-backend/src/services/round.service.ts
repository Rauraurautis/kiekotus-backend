import { eq } from "drizzle-orm";
import { db } from "../lib/drizzle";
import { roundPlayers, rounds } from "../lib/drizzle/schema";
import { RoundType } from "../lib/zod/schemas/round.schema";

export const addRound = async (input: RoundType) => {
    const round = await db.insert(rounds).values({ courseId: input.courseId }).returning()
    const roundId = round[0].id

    for (let player of input.roundPlayers) {
        if (player.player) {
            await db.insert(roundPlayers).values({ roundId, score: player.score, userId: player.player.id }).returning()
        }


        return round
    }
}

export const getRounds = async (userId: number) => {

    const rounds = await db.query.rounds.findMany({
        columns: { roundPlayers }
    })

    return rounds
}