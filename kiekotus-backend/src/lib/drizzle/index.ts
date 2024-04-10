import dotenv from "dotenv"
import { drizzle } from "drizzle-orm/node-postgres"
// import { drizzle } from "drizzle-orm/postgres-js"
import { Client, Pool } from "pg"
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


// const client = postgres(process.env.DRIZZLE_DATABASE_URL as string)


export const db = drizzle(client, { schema: schema })

