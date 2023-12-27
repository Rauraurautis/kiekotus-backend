import { number, object, string, z } from "zod";

export const addPlayedCourseSchema = object({
    courseId: number(),
    date: string().default("")
})


export type PlayedCourseType = z.infer<typeof addPlayedCourseSchema>