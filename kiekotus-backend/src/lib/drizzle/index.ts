import dotenv from "dotenv"
import { drizzle } from "drizzle-orm/node-postgres"
import { Client } from "pg"
import * as schema from "./schema"

dotenv.config()

const dbURI = process.env.DRIZZLE_DATABASE_URL
if (!dbURI) {
    throw new Error("DbURI is not set")
}

const client = new Client({
    connectionString: dbURI
})

client.connect()

export const db = drizzle(client, { schema: schema })

