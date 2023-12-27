import { array, number, object, string, z } from "zod"



const roundPlayerSchema = object({
    player: object({
        id: number({ required_error: "Enter id of user or nonregisteredplayer" }),
        type: string({required_error: "Enter player type (nonregisteredPlayer || user)"})
        .refine(val => val === "nonregisteredPlayer" || val === "user")
    }),
    score: number({ required_error: "Enter score" })
})


export const createRoundSchema = object({
    courseId: number({ required_error: "Enter course id" }),
    roundPlayers: array(roundPlayerSchema)
})

export type RoundType = z.infer<typeof createRoundSchema>