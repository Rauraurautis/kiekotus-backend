import { eq } from "drizzle-orm"
import { db } from "../lib/drizzle"
import { courses, holes, users } from "../lib/drizzle/schema"
import { CourseType, HoleType } from "../lib/zod/schemas/course.schema"

export const getSingleCourse = async (id: number) => {
    const course = await db.query.courses.findFirst({
        where: eq(courses.id, id), with: { holes: { columns: { distance: true, par: true } } }
    })

    return course ? course : "No course found with that id"
}

export const getAllCourses = async () => {
    return await db.query.courses.findMany()
}

export const addCourse = async (input: CourseType) => {
    const course = await db.insert(courses).values(input).returning()
    if (input.holes) {
        for (let hole of input.holes) {
            await addHole(hole, course[0].id)
        }
    }
    return course[0]
}

export const deleteCourse = async (id: string) => {
    const course = await db.delete(courses).where((eq(courses.id, Number(id)))).returning()
    return course[0]
}

export const addHole = async (input: HoleType, courseId: number) => {
    const hole = await db.insert(holes).values({ ...input, courseId }).returning()
    return hole[0]
}