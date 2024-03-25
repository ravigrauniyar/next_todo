CREATE TABLE IF NOT EXISTS "todos" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" varchar(256),
	"description" varchar(256),
	"priority" integer,
	"isCompleted" boolean,
	"created_at" varchar,
	"updated_at" varchar
);
