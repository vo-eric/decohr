CREATE TABLE "decohr_generated_image" (
	"id" uuid PRIMARY KEY NOT NULL,
	"image_url" text NOT NULL,
	"userId" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "decohr_generated_image" ADD CONSTRAINT "decohr_generated_image_userId_decohr_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."decohr_user"("id") ON DELETE no action ON UPDATE no action;