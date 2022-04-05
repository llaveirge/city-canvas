set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";
CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"userName" TEXT NOT NULL UNIQUE,
	"photoUrl" TEXT NOT NULL,
	"hashedPassword" TEXT NOT NULL,
	"createdAt" timestamptz NOT NULL default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "posts" (
	"postId" serial NOT NULL,
	"title" TEXT NOT NULL,
	"artistName" TEXT NOT NULL,
	"artPhotoUrl" TEXT NOT NULL,
	"comment" TEXT NOT NULL,
	"lat" FLOAT NOT NULL,
	"lng" FLOAT NOT NULL,
	"reported" BOOLEAN NOT NULL DEFAULT false,
	"createdAt" timestamptz NOT NULL default now(),
	"deleted" timestamptz default null,
	"userId" integer NOT NULL,
	CONSTRAINT "posts_pk" PRIMARY KEY ("postId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "savedPosts" (
	"userId" integer NOT NULL,
	"postId" integer NOT NULL,
	"createdAt" timestamptz NOT NULL default now(),
	CONSTRAINT "savedPosts_pk" PRIMARY KEY ("userId","postId")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "posts" ADD CONSTRAINT "posts_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "savedPosts" ADD CONSTRAINT "savedPosts_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "savedPosts" ADD CONSTRAINT "savedPosts_fk1" FOREIGN KEY ("postId") REFERENCES "posts"("postId");
