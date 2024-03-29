
CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(80) NOT NULL UNIQUE,
	"password" varchar(1000) NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);





CREATE TABLE "workout_exercises" (
	"id" serial NOT NULL,
	"exercise_id" integer NOT NULL,
	"workout_id" integer NOT NULL,
	"sets" integer NOT NULL,
	"weight" integer NOT NULL,
	"reps" integer NOT NULL,
	CONSTRAINT "workout_exercises_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "template" (
	"id" serial NOT NULL UNIQUE,
	"name" varchar(255) NOT NULL,
	"user_id" integer NOT NULL,
	CONSTRAINT "template_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "workouts" (
	"id" serial NOT NULL,
	"created_at" TIMESTAMP NOT NULL,
	"template_id" integer NOT NULL,
	CONSTRAINT "workouts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "exercises" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"template_id" integer NOT NULL,
	CONSTRAINT "exercises_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "workout_exercises" ADD CONSTRAINT "workout_exercises_fk0" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id");
ALTER TABLE "workout_exercises" ADD CONSTRAINT "workout_exercises_fk1" FOREIGN KEY ("workout_id") REFERENCES "workouts"("id");

ALTER TABLE "template" ADD CONSTRAINT "template_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "workouts" ADD CONSTRAINT "workouts_fk0" FOREIGN KEY ("template_id") REFERENCES "template"("id");

ALTER TABLE "exercises" ADD CONSTRAINT "exercises_fk0" FOREIGN KEY ("template_id") REFERENCES "template"("id");

-- Altered Table
ALTER TABLE "workouts"
DROP CONSTRAINT "workouts_fk0";

ALTER TABLE "workouts"
ADD CONSTRAINT "workouts_fk0"
FOREIGN KEY ("template_id") 
REFERENCES "template"("id")
ON DELETE CASCADE;

ALTER TABLE "exercises"
DROP CONSTRAINT "exercises_fk0";

ALTER TABLE "exercises"
ADD CONSTRAINT "exercises_fk0"
FOREIGN KEY ("template_id") 
REFERENCES "template"("id")
ON DELETE CASCADE;


ALTER TABLE "workout_exercises" 
DROP CONSTRAINT "workout_exercises_fk1";

ALTER TABLE "workout_exercises" 
ADD CONSTRAINT "workout_exercises_fk1" 
FOREIGN KEY ("workout_id") 
REFERENCES "workouts"("id") 
ON DELETE CASCADE;





ALTER SEQUENCE template_id_seq RESTART WITH 4;


ALTER TABLE "template" ALTER COLUMN "id" SET DEFAULT nextval('template_id_seq');


ALTER SEQUENCE exercises_id_seq RESTART WITH 11;

ALTER TABLE "exercises" ALTER COLUMN "id" SET DEFAULT nextval('exercises_id_seq');