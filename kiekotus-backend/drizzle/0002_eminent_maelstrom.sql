ALTER TABLE "roundNonregisteredUsers" RENAME TO "roundNonregisteredPlayers";--> statement-breakpoint
ALTER TABLE "roundNonregisteredPlayers" DROP CONSTRAINT "roundNonregisteredUsers_round_id_rounds_id_fk";
--> statement-breakpoint
ALTER TABLE "roundNonregisteredPlayers" DROP CONSTRAINT "roundNonregisteredUsers_nonregistered_player_id_nonregisteredPlayers_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "roundNonregisteredPlayers" ADD CONSTRAINT "roundNonregisteredPlayers_round_id_rounds_id_fk" FOREIGN KEY ("round_id") REFERENCES "rounds"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "roundNonregisteredPlayers" ADD CONSTRAINT "roundNonregisteredPlayers_nonregistered_player_id_nonregisteredPlayers_id_fk" FOREIGN KEY ("nonregistered_player_id") REFERENCES "nonregisteredPlayers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
