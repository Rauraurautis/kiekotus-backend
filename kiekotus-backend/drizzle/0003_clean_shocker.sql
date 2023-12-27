ALTER TABLE "nonregisteredPlayers" RENAME TO "nonregistered_players";--> statement-breakpoint
ALTER TABLE "roundNonregisteredPlayers" RENAME TO "round_nonregisteredPlayers";--> statement-breakpoint
ALTER TABLE "roundPlayers" RENAME TO "round_players";--> statement-breakpoint
ALTER TABLE "nonregistered_players" DROP CONSTRAINT "nonregisteredPlayers_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "round_nonregisteredPlayers" DROP CONSTRAINT "roundNonregisteredPlayers_round_id_rounds_id_fk";
--> statement-breakpoint
ALTER TABLE "round_nonregisteredPlayers" DROP CONSTRAINT "roundNonregisteredPlayers_nonregistered_player_id_nonregisteredPlayers_id_fk";
--> statement-breakpoint
ALTER TABLE "round_players" DROP CONSTRAINT "roundPlayers_round_id_rounds_id_fk";
--> statement-breakpoint
ALTER TABLE "round_players" DROP CONSTRAINT "roundPlayers_user_id_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nonregistered_players" ADD CONSTRAINT "nonregistered_players_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "round_nonregisteredPlayers" ADD CONSTRAINT "round_nonregisteredPlayers_round_id_rounds_id_fk" FOREIGN KEY ("round_id") REFERENCES "rounds"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "round_nonregisteredPlayers" ADD CONSTRAINT "round_nonregisteredPlayers_nonregistered_player_id_nonregistered_players_id_fk" FOREIGN KEY ("nonregistered_player_id") REFERENCES "nonregistered_players"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "round_players" ADD CONSTRAINT "round_players_round_id_rounds_id_fk" FOREIGN KEY ("round_id") REFERENCES "rounds"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "round_players" ADD CONSTRAINT "round_players_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
