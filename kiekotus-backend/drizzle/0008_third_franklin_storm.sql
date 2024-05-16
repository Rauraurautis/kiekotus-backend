ALTER TABLE "rounds" RENAME COLUMN "user_id" TO "roundCreator";--> statement-breakpoint
ALTER TABLE "rounds" DROP CONSTRAINT "rounds_user_id_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rounds" ADD CONSTRAINT "rounds_roundCreator_users_id_fk" FOREIGN KEY ("roundCreator") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
