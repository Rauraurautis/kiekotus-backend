import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("discgolfDb.db")

export default db