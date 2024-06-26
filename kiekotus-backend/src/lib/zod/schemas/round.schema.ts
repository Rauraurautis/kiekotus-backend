import { array, number, object, string, z, union } from "zod"

const playerSchema = object({
    name: string(),
    id: union([z.string(), z.number()])
})

const roundPlayerSchema = object({
    player: playerSchema,
    scores: array(number())
})

export const createRoundSchema = object({
    courseId: number({ required_error: "Enter course id" }),
    courseName: string({ required_error: "Course name required" }),
    roundPlayers: array(roundPlayerSchema)
})

export type RoundType = z.infer<typeof createRoundSchema>