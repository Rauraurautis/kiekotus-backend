import { object, string, z } from "zod"

export const createSessionSchema = object({
        email: string({ required_error: "Email is required" }).email(),
        password: string({ required_error: "Password is required" })
})

export type SessionType = z.infer<typeof createSessionSchema>