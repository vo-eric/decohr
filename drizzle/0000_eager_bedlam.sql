CREATE TABLE "decohr_image_profile" (
	"id" uuid PRIMARY KEY NOT NULL,
	"image_url" text NOT NULL,
	"styles" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"reasoning" text
);
--> statement-breakpoint
CREATE TABLE "decohr_like" (
	"id" uuid PRIMARY KEY NOT NULL,
	"userId" uuid,
	"imageId" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "decohr_user" (
	"id" uuid PRIMARY KEY NOT NULL,
	"likes" jsonb,
	"taste_profile" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "decohr_like" ADD CONSTRAINT "decohr_like_userId_decohr_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."decohr_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "decohr_like" ADD CONSTRAINT "decohr_like_imageId_decohr_image_profile_id_fk" FOREIGN KEY ("imageId") REFERENCES "public"."decohr_image_profile"("id") ON DELETE no action ON UPDATE no action;