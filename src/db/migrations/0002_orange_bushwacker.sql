ALTER TABLE "user_image" DROP CONSTRAINT "user_image_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "user_image" ADD CONSTRAINT "user_image_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;