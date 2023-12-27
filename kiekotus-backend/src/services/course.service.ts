import { eq } from "drizzle-orm"
import { db } from "../lib/drizzle"
import { courses, holes } from "../lib/drizzle/schema"
import { CourseType, HoleType } from "../lib/zod/schemas/course.schema"

export const getSingleCourse = async (id: number) => {
    const course = await db.query.courses.findFirst({
        where: eq(courses.id, id), columns: { id: true }, with: { holes: true }
    })

    return course ? course : "No course found with that id"
}

export const getAllCourses = async () => {
    return await db.query.courses.findMany({})
}

export const addCourse = async (input: CourseType) => {
    const course = await db.insert(courses).values(input).returning()
    return course[0]
}

export const addHole = async (input: HoleType, courseId: number) => {
    const hole = await db.insert(holes).values({ ...input, courseId }).returning()
    return hole[0]
}