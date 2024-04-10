import { relations } from "drizzle-orm";
import { pgTable, serial, text, varchar, boolean, integer, timestamp, date, primaryKey, json } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    username: text("name").notNull().unique(),
    email: text("email").notNull().unique(),
    password: text("password"),
    profileImage: text("profile_image"),
    createdAt: date("createdAt").defaultNow(),
    updatedAt: date("updatedAt").defaultNow()
})

export const userRelations = relations(users, ({ many, one }) => ({
    rounds: many(rounds),
    friendships: many(friendships),
    sessions: many(sessions),
    statistics: one(statistics)
}))

export const friendships = pgTable("friendships", {
    id: serial("id").primaryKey(),
    firstUser: integer("first_user_id").notNull().references(() => users.id),
    secondUser: integer("second_user_id").notNull().references(() => users.id),
    status: boolean("status").default(false)
})


export const statistics = pgTable("statistics", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => users.id),
    favCourse: integer("favourite_course_id")
})

export const statisticsRelations = relations(statistics, ({ one, many }) => ({
    favCourse: one(courses, {
        fields: [statistics.favCourse],
        references: [courses.id]
    }),
    playedCourses: many(statisticPlayedCourses)
}))

export const statisticPlayedCourses = pgTable("statistics_played_courses", {
    statisticsId: integer("statistics_id").notNull().references(() => statistics.id),
    courseId: integer("course_id").notNull().references(() => courses.id),
    playedAt: date("played_at").defaultNow()
})

export const statisticPlayedCourseRelations = relations(statisticPlayedCourses, ({ one }) => ({
    statistics: one(statistics, {
        fields: [statisticPlayedCourses.statisticsId],
        references: [statistics.id]
    }),
    course: one(courses, {
        fields: [statisticPlayedCourses.courseId],
        references: [courses.id]
    })
}))

export const courses = pgTable("courses", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    latitude: text("latitude"),
    longitude: text("longitude"),
    difficulty: text("difficulty"),
    address: text("address"),
    description: text("description"),
    mapImage: text("map_image")
})

export const courseRelations = relations(courses, ({ many }) => ({
    holes: many(holes),
    statistics: many(statistics),
    rounds: many(rounds)
}))

export const holes = pgTable("holes", {
    id: serial("id").primaryKey(),
    distance: integer("distance"),
    par: integer("par").notNull(),
    courseId: integer("course_id")
})

export const holeRelations = relations(holes, ({ one }) => ({
    course: one(courses, {
        fields: [holes.courseId],
        references: [courses.id]
    })
}))

export const rounds = pgTable("rounds", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => users.id),
    courseId: integer("course_id"),
    roundPlayers: varchar("roundPlayers"),
    createdAt: date("createdAt").defaultNow()
})

export const roundsRelations = relations(rounds, ({ many, one }) => ({
    course: one(courses, {
        fields: [rounds.courseId],
        references: [courses.id]
    })
}))

/*export const roundPlayers = pgTable("round_players", {
    roundId: integer("round_id").notNull().references(() => rounds.id),
    userId: integer("user_id").references(() => users.id),
    score: integer("score").default(0)
}, (t) => ({ pk: primaryKey({ columns: [t.roundId, t.userId] }) })) 


export const roundPlayersRelations = relations(roundPlayers, ({ one }) => ({
    round: one(rounds, {
        fields: [roundPlayers.roundId],
        references: [rounds.id]
    }),
    user: one(users, {
        fields: [roundPlayers.userId],
        references: [users.id]
    }),
})) */

export const sessions = pgTable("sessions", {
    id: serial("id").primaryKey(),
    valid: boolean("valid").default(true),
    userAgent: text("userAgent"),
    userId: integer("user_id").references(() => users.id),
    createdAt: timestamp("created_at").notNull().defaultNow()
}) 