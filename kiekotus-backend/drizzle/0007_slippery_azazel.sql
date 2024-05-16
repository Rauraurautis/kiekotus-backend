DROP TABLE "round_players";--> statement-breakpoint
ALTER TABLE "rounds" ADD COLUMN "user_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "rounds" ADD COLUMN "roundPlayers" varchar;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rounds" ADD CONSTRAINT "rounds_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
