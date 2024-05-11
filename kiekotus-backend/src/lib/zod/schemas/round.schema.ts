import { array, number, object, string, z, union } from "zod"



const roundPlayerSchema = object({
    name: string(),
    score: number({ required_error: "Enter score" })
})

export const createRoundSchema = object({
    courseId: number({ required_error: "Enter course id" }),
    courseName: string({ required_error: "Course name required" }),
    roundPlayers: array(roundPlayerSchema)
})

export type RoundType = z.infer<typeof createRoundSchema>