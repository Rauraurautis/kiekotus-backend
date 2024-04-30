import { eq } from "drizzle-orm"
import { db } from "../lib/drizzle"
import { statisticPlayedCourses, statistics } from "../lib/drizzle/schema"
import { PlayedCourseType } from "../lib/zod/schemas/statistics.schema"

export const getUserStatistics = async (userId: number) => {
    const stats = await db.query.statistics.findFirst({
        where: eq(statistics.userId, userId), columns: { favCourse: true, id: true }, with: { playedCourses: { with: { course: { columns: { name: true } } } } }
    })
    return stats
}

export const addNewPlayedCourse = async (userId: number, input: PlayedCourseType) => {
    const userStatistics = await db.query.statistics.findFirst({
        where: eq(statistics.userId, userId)
    })

    if (userStatistics && !input.date) {
        const playedCourses = await db.insert(statisticPlayedCourses)
            .values({ courseId: input.courseId, statisticsId: userStatistics.id })
        return playedCourses
    }

    throw Error()
}