CREATE TABLE IF NOT EXISTS "roundPlayers" (
	"round_id" integer NOT NULL,
	"user_id" integer,
	"score" integer DEFAULT 0,
	CONSTRAINT roundPlayers_round_id_user_id PRIMARY KEY("round_id","user_id")
);
--> statement-breakpoint
DROP TABLE "roundUsers";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "roundPlayers" ADD CONSTRAINT "roundPlayers_round_id_rounds_id_fk" FOREIGN KEY ("round_id") REFERENCES "rounds"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "roundPlayers" ADD CONSTRAINT "roundPlayers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
