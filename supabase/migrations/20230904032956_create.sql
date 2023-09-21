create sequence "public"."country_id_seq";

create table "public"."country" (
    "id" integer not null default nextval('country_id_seq'::regclass),
    "uuid" character varying(255) default gen_random_uuid(),
    "value" character varying(255),
    "english_name" character varying(255),
    "cantonese_name" character varying(255)
);


create table "public"."user" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone default now(),
    "uuid" uuid,
    "email" character varying,
    "username" character varying,
    "status" text default 'active'::text,
    "role" text default 'user'::text
);


alter table "public"."user" enable row level security;

alter sequence "public"."country_id_seq" owned by "public"."country"."id";

CREATE UNIQUE INDEX country_pkey ON public.country USING btree (id);

CREATE UNIQUE INDEX user_email_key ON public."user" USING btree (email);

CREATE UNIQUE INDEX user_id_key ON public."user" USING btree (id);

CREATE UNIQUE INDEX user_pkey ON public."user" USING btree (id);

CREATE UNIQUE INDEX user_username_key ON public."user" USING btree (username);

alter table "public"."country" add constraint "country_pkey" PRIMARY KEY using index "country_pkey";

alter table "public"."user" add constraint "user_pkey" PRIMARY KEY using index "user_pkey";

alter table "public"."user" add constraint "user_email_key" UNIQUE using index "user_email_key";

alter table "public"."user" add constraint "user_id_key" UNIQUE using index "user_id_key";

alter table "public"."user" add constraint "user_username_key" UNIQUE using index "user_username_key";

alter table "public"."user" add constraint "user_uuid_fkey" FOREIGN KEY (uuid) REFERENCES auth.users(id) not valid;

alter table "public"."user" validate constraint "user_uuid_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  INSERT INTO public.user (uuid, email, username)
  VALUES (NEW.id, NEW.email , NEW.email);
  RETURN NEW;
END;

$function$
;


