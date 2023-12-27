import dotenv from "dotenv"
import { Pool } from "pg"
dotenv.config()

import { drizzle } from "drizzle-orm/node-postgres"
import { migrate } from "drizzle-orm/node-postgres/migrator"

const connectionString = process.env.DRIZZLE_DATABASE_URL ?? ""
const pool = new Pool({ connectionString })
const db = drizzle(pool);

const main = async () => {
    console.log("Migrating..")
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("Migrated!")
    process.exit(0)
}

main().catch(err => console.error(err))