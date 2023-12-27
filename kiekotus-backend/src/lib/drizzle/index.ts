import dotenv from "dotenv"
import { drizzle } from "drizzle-orm/node-postgres"
// import { drizzle } from "drizzle-orm/postgres-js"
import { Client, Pool } from "pg"
import * as schema from "./schema"
import postgres from "postgres"
import config from "config"

const database = config.get("db") as string

dotenv.config()

const client = new Client({
    connectionString: database
})

client.connect()

// const client = postgres(process.env.DRIZZLE_DATABASE_URL as string)


export const db = drizzle(client, { schema: schema })

