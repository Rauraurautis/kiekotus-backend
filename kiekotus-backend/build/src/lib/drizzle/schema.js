"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessions = exports.roundsRelations = exports.rounds = exports.holeRelations = exports.holes = exports.courseRelations = exports.courses = exports.statisticPlayedCourseRelations = exports.statisticPlayedCourses = exports.statisticsRelations = exports.statistics = exports.friendshipsRelations = exports.friendships = exports.userRelations = exports.users = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    username: (0, pg_core_1.text)("name").notNull().unique(),
    email: (0, pg_core_1.text)("email").notNull().unique(),
    role: (0, pg_core_1.text)("role").notNull(),
    password: (0, pg_core_1.text)("password"),
    profileImage: (0, pg_core_1.text)("profile_image"),
    createdAt: (0, pg_core_1.date)("createdAt").defaultNow(),
    updatedAt: (0, pg_core_1.date)("updatedAt").defaultNow()
});
exports.userRelations = (0, drizzle_orm_1.relations)(exports.users, ({ many, one }) => ({
    rounds: many(exports.rounds),
    friendships: many(exports.friendships),
    sessions: many(exports.sessions),
    statistics: one(exports.statistics)
}));
exports.friendships = (0, pg_core_1.pgTable)("friendships", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    firstUser: (0, pg_core_1.integer)("first_user_id").notNull().references(() => exports.users.id),
    secondUser: (0, pg_core_1.integer)("second_user_id").notNull().references(() => exports.users.id),
    status: (0, pg_core_1.boolean)("status").default(false)
});
exports.friendshipsRelations = (0, drizzle_orm_1.relations)(exports.friendships, ({ one }) => ({
    firstUser: one(exports.users, {
        fields: [exports.friendships.firstUser],
        references: [exports.users.id]
    }),
    secondUser: one(exports.users, {
        fields: [exports.friendships.secondUser],
        references: [exports.users.id]
    })
}));
exports.statistics = (0, pg_core_1.pgTable)("statistics", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.integer)("user_id").notNull().references(() => exports.users.id),
    favCourse: (0, pg_core_1.integer)("favourite_course_id")
});
exports.statisticsRelations = (0, drizzle_orm_1.relations)(exports.statistics, ({ one, many }) => ({
    favCourse: one(exports.courses, {
        fields: [exports.statistics.favCourse],
        references: [exports.courses.id]
    }),
    playedCourses: many(exports.statisticPlayedCourses)
}));
exports.statisticPlayedCourses = (0, pg_core_1.pgTable)("statistics_played_courses", {
    statisticsId: (0, pg_core_1.integer)("statistics_id").notNull().references(() => exports.statistics.id),
    courseId: (0, pg_core_1.integer)("course_id").notNull().references(() => exports.courses.id),
    playedAt: (0, pg_core_1.date)("played_at").defaultNow()
});
exports.statisticPlayedCourseRelations = (0, drizzle_orm_1.relations)(exports.statisticPlayedCourses, ({ one }) => ({
    statistics: one(exports.statistics, {
        fields: [exports.statisticPlayedCourses.statisticsId],
        references: [exports.statistics.id]
    }),
    course: one(exports.courses, {
        fields: [exports.statisticPlayedCourses.courseId],
        references: [exports.courses.id]
    })
}));
exports.courses = (0, pg_core_1.pgTable)("courses", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    latitude: (0, pg_core_1.text)("latitude"),
    longitude: (0, pg_core_1.text)("longitude"),
    difficulty: (0, pg_core_1.text)("difficulty"),
    address: (0, pg_core_1.text)("address"),
    description: (0, pg_core_1.text)("description"),
    mapImage: (0, pg_core_1.text)("map_image")
});
exports.courseRelations = (0, drizzle_orm_1.relations)(exports.courses, ({ many }) => ({
    holes: many(exports.holes),
    statistics: many(exports.statistics),
    rounds: many(exports.rounds)
}));
exports.holes = (0, pg_core_1.pgTable)("holes", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    distance: (0, pg_core_1.integer)("distance"),
    par: (0, pg_core_1.integer)("par").notNull(),
    courseId: (0, pg_core_1.integer)("course_id")
});
exports.holeRelations = (0, drizzle_orm_1.relations)(exports.holes, ({ one }) => ({
    course: one(exports.courses, {
        fields: [exports.holes.courseId],
        references: [exports.courses.id]
    })
}));
exports.rounds = (0, pg_core_1.pgTable)("rounds", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.integer)("user_id").notNull().references(() => exports.users.id),
    courseId: (0, pg_core_1.integer)("course_id"),
    roundPlayers: (0, pg_core_1.varchar)("roundPlayers"),
    createdAt: (0, pg_core_1.date)("createdAt").defaultNow()
});
exports.roundsRelations = (0, drizzle_orm_1.relations)(exports.rounds, ({ many, one }) => ({
    course: one(exports.courses, {
        fields: [exports.rounds.courseId],
        references: [exports.courses.id]
    })
}));
exports.sessions = (0, pg_core_1.pgTable)("sessions", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    valid: (0, pg_core_1.boolean)("valid").default(true),
    userAgent: (0, pg_core_1.text)("userAgent"),
    userId: (0, pg_core_1.integer)("user_id").references(() => exports.users.id),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow()
});
