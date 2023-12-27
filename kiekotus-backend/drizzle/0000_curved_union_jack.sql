CREATE TABLE IF NOT EXISTS "courses" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"latitude" text,
	"longitude" text,
	"difficulty" text,
	"address" text,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "friendships" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_user_id" integer NOT NULL,
	"second_user_id" integer NOT NULL,
	"status" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "holes" (
	"id" serial PRIMARY KEY NOT NULL,
	"distance" integer,
	"par" integer NOT NULL,
	"course_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nonregisteredPlayers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "roundNonregisteredUsers" (
	"round_id" integer NOT NULL,
	"nonregistered_player_id" integer,
	"score" integer DEFAULT 0,
	CONSTRAINT roundNonregisteredUsers_round_id_nonregistered_player_id PRIMARY KEY("round_id","nonregistered_player_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "roundUsers" (
	"round_id" integer NOT NULL,
	"user_id" integer,
	"score" integer DEFAULT 0,
	CONSTRAINT roundUsers_round_id_user_id PRIMARY KEY("round_id","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rounds" (
	"id" serial PRIMARY KEY NOT NULL,
	"course_id" integer,
	"createdAt" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"valid" boolean DEFAULT true,
	"userAgent" text,
	"user_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "statistics_played_courses" (
	"statistics_id" integer NOT NULL,
	"course_id" integer NOT NULL,
	"played_at" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "statistics" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"favourite_course_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text,
	"createdAt" date DEFAULT now(),
	"updatedAt" date DEFAULT now(),
	CONSTRAINT "users_name_unique" UNIQUE("name"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "friendships" ADD CONSTRAINT "friendships_first_user_id_users_id_fk" FOREIGN KEY ("first_user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "friendships" ADD CONSTRAINT "friendships_second_user_id_users_id_fk" FOREIGN KEY ("second_user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nonregisteredPlayers" ADD CONSTRAINT "nonregisteredPlayers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "roundNonregisteredUsers" ADD CONSTRAINT "roundNonregisteredUsers_round_id_rounds_id_fk" FOREIGN KEY ("round_id") REFERENCES "rounds"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "roundNonregisteredUsers" ADD CONSTRAINT "roundNonregisteredUsers_nonregistered_player_id_nonregisteredPlayers_id_fk" FOREIGN KEY ("nonregistered_player_id") REFERENCES "nonregisteredPlayers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "roundUsers" ADD CONSTRAINT "roundUsers_round_id_rounds_id_fk" FOREIGN KEY ("round_id") REFERENCES "rounds"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "roundUsers" ADD CONSTRAINT "roundUsers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "statistics_played_courses" ADD CONSTRAINT "statistics_played_courses_statistics_id_statistics_id_fk" FOREIGN KEY ("statistics_id") REFERENCES "statistics"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "statistics_played_courses" ADD CONSTRAINT "statistics_played_courses_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "statistics" ADD CONSTRAINT "statistics_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
