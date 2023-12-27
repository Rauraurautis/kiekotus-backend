import db from "./SQliteSetup"

export const getFriendsLocalDB = async () => {
    const result = await db.execAsync([{ sql: "SELECT * FROM Friend UNION SELECT * FROM Nonregistered_friend", args: [] }], true)
    return result
}

export const saveFriendLocalDB = async () => {

}