import { array, number, object, string, z, union } from "zod"



const nonregisteredPlayer = object({
    name: z.string({ required_error: "Enter player name" })
})

const registeredPlayer = z.object({
    id: z.number({ required_error: "Enter id of user or nonregisteredplayer" })
});

const roundPlayerSchema = object({
    player: union([nonregisteredPlayer, registeredPlayer]),
    score: number({ required_error: "Enter score" })
})


export const createRoundSchema = object({
    courseId: number({ required_error: "Enter course id" }),
    roundPlayers: array(roundPlayerSchema)
})

export type RoundType = z.infer<typeof createRoundSchema>