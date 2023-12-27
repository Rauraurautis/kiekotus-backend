import { number, object, string, z } from "zod";

export const findIdSchema = object({ id: string().refine(val => !isNaN(Number(val))) })

export const createUserSchema = object({
    username: string({ required_error: "Name required" })
        .min(2, { message: "Minimum length 2 characters" }),
    email: string({ required_error: "Email required" })
        .email(),
    password: string({ required_error: "Password required" })
        .min(4, { message: "Minimum length 4 characters" }),
    confirmPassword: string({ required_error: "Confirm password required" })
})


export type UserType = z.infer<typeof createUserSchema>

export const createNonregisteredPlayerSchema = object({
    name: string({ required_error: "Name required" })
        .min(2, { message: "Minimum length 2 characters" }),

})

export type NonregisteredPlayerType = z.infer<typeof createNonregisteredPlayerSchema>