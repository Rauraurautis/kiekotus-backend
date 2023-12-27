ALTER TABLE "round_nonregisteredPlayers" RENAME TO "round_nonregisteredplayers";--> statement-breakpoint
ALTER TABLE "round_nonregisteredplayers" DROP CONSTRAINT "round_nonregisteredPlayers_round_id_rounds_id_fk";
--> statement-breakpoint
ALTER TABLE "round_nonregisteredplayers" DROP CONSTRAINT "round_nonregisteredPlayers_nonregistered_player_id_nonregistered_players_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "round_nonregisteredplayers" ADD CONSTRAINT "round_nonregisteredplayers_round_id_rounds_id_fk" FOREIGN KEY ("round_id") REFERENCES "rounds"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "round_nonregisteredplayers" ADD CONSTRAINT "round_nonregisteredplayers_nonregistered_player_id_nonregistered_players_id_fk" FOREIGN KEY ("nonregistered_player_id") REFERENCES "nonregistered_players"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
