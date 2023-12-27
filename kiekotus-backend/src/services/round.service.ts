import { eq } from "drizzle-orm";
import { db } from "../lib/drizzle";
import { roundNonregisteredPlayers, roundPlayers, rounds } from "../lib/drizzle/schema";
import { RoundType } from "../lib/zod/schemas/round.schema";

export const addRound = async (input: RoundType) => {
    const round = await db.insert(rounds).values({ courseId: input.courseId }).returning()
    const roundId = round[0].id
    for (let player of input.roundPlayers) {
        if (player.player.type === "user") {
            await db.insert(roundPlayers).values({ roundId, score: player.score, userId: player.player.id }).returning()
        } else {
            await db.insert(roundNonregisteredPlayers).values({ roundId, score: player.score, nonregisteredPlayerId: player.player.id })
        }
    }
    return round
}

export const getRounds = async (userId: number) => {

    const rounds = await db.query.rounds.findMany({
        with: {
            roundPlayers: { columns: { userId: true, score: true } },
            roundNonregisteredPlayers: { columns: { nonregisteredPlayerId: true, score: true } }
        }
    })

    return rounds
}