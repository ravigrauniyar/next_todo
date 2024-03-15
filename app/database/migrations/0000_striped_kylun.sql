CREATE TABLE IF NOT EXISTS "todos" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" varchar(256),
	"description" varchar(256),
	"priority" integer,
	"created_at" date,
	"updated_at" date
);
