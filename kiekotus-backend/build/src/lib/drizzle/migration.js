"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const node_postgres_1 = require("drizzle-orm/node-postgres");
const migrator_1 = require("drizzle-orm/node-postgres/migrator");
const connectionString = (_a = process.env.DRIZZLE_DATABASE_URL) !== null && _a !== void 0 ? _a : "";
const pool = new pg_1.Pool({ connectionString });
const db = (0, node_postgres_1.drizzle)(pool);
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Migrating..");
    yield (0, migrator_1.migrate)(db, { migrationsFolder: "drizzle" });
    console.log("Migrated!");
    process.exit(0);
});
main().catch(err => console.error(err));
