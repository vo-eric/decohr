CREATE TABLE "decohr_account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "decohr_generated_image" (
	"id" uuid PRIMARY KEY NOT NULL,
	"image_url" text NOT NULL,
	"user_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
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
	"user_id" text,
	"imageId" uuid,
	"is_liked" boolean NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "decohr_session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "decohr_session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "decohr_user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"likes" jsonb,
	"taste_profile" text,
	CONSTRAINT "decohr_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "decohr_verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "decohr_account" ADD CONSTRAINT "decohr_account_user_id_decohr_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."decohr_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "decohr_generated_image" ADD CONSTRAINT "decohr_generated_image_user_id_decohr_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."decohr_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "decohr_like" ADD CONSTRAINT "decohr_like_user_id_decohr_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."decohr_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "decohr_like" ADD CONSTRAINT "decohr_like_imageId_decohr_image_profile_id_fk" FOREIGN KEY ("imageId") REFERENCES "public"."decohr_image_profile"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "decohr_session" ADD CONSTRAINT "decohr_session_user_id_decohr_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."decohr_user"("id") ON DELETE cascade ON UPDATE no action;