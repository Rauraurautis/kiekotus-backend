import { get, omit } from "lodash"
import config from "config"
import { JwtPayload } from "jsonwebtoken"
import { SessionType } from "../lib/zod/schemas/session.schema"
import { db } from "../lib/drizzle"
import { eq } from "drizzle-orm"
import { sessions, users } from "../lib/drizzle/schema"
import { UserType } from "../lib/zod/schemas/user.schema"
import { DatabaseUser } from "../lib/types"

export const createSession = async (input: DatabaseUser, userAgent: string) => {
    const session = await db.insert(sessions).values({ userAgent: userAgent, userId: input.id }).returning()

    return session[0]
}
