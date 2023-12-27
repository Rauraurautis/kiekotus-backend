import { integer } from "drizzle-orm/pg-core";
import { number, object, string, z } from "zod";

const latitudeRegex = /^(-?\d{1,2}(?:\.\d+)?|[-+]?[1-8]?\d{1}(?:\.\d+)?)$/
const longitudeRegex = /^(-?\d{1,3}(?:\.\d+)?|[-+]?(?:1[0-7]|[1-9])?\d{1}(?:\.\d+)?)$/

const difficulties = ["AAA1", "AA2", "A3", "BB1", "B2", "C1", "D1"]

export const createCourseSchema = object({
    name: string({ required_error: "Need to add course name" })
        .min(2, "Too short name for course"),
    latitude: string({ required_error: "Latitude required" })
        .regex(new RegExp(latitudeRegex), "Incorrect latitude format"),
    longitude: string({ required_error: "Longitude required" })
        .regex(new RegExp(longitudeRegex), "Incorrect longitude format"),
    difficulty: string()
        .refine(val => difficulties.includes(val), { message: "Incorrect difficulty" }).optional(),
    address: string({ required_error: "Address required" }).min(5, "Too short address"),
    description: string()
})

export type CourseType = z.infer<typeof createCourseSchema>

export const createHoleSchema = object({
    distance: number(),
    par: number({required_error: "Par is required"}).min(1).max(10),
})

export type HoleType = z.infer<typeof createHoleSchema>

