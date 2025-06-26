-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.about_cms (
    id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
    created_at timestamp
    with
        time zone NOT NULL DEFAULT now(),
        about text NOT NULL,
        user_id uuid DEFAULT gen_random_uuid (),
        CONSTRAINT about_cms_pkey PRIMARY KEY (id),
        CONSTRAINT about_cms_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users (id)
);

CREATE TABLE public.contact_cms (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  title character varying DEFAULT ''::character varying,
  alias character varying DEFAULT ''::character varying,
  url character varying DEFAULT ''::character varying,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id uuid,
  CONSTRAINT contact_cms_pkey PRIMARY KEY (id),
  CONSTRAINT contact_cms_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

CREATE TABLE public.education_cms (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  start_date character varying DEFAULT ''::character varying,
  end_date character varying DEFAULT ''::character varying,
  alias character varying DEFAULT ''::character varying,
  description character varying DEFAULT ''::character varying,
  images jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id uuid,
  link character varying DEFAULT ''::character varying,
  skills character varying,
  CONSTRAINT education_cms_pkey PRIMARY KEY (id),
  CONSTRAINT education_cms_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

CREATE TABLE public.profile_cms (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  profile_url character varying,
  username character varying DEFAULT ''::character varying,
  website character varying,
  bio character varying,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id uuid,
  CONSTRAINT profile_cms_pkey PRIMARY KEY (id),
  CONSTRAINT profile_cms_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

CREATE TABLE public.project_cms (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  start_date character varying DEFAULT ''::character varying,
  end_date character varying DEFAULT ''::character varying,
  alias character varying DEFAULT ''::character varying,
  description character varying DEFAULT ''::character varying,
  images jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id uuid,
  link character varying DEFAULT ''::character varying,
  skills text,
  CONSTRAINT project_cms_pkey PRIMARY KEY (id),
  CONSTRAINT project_cms_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

CREATE TABLE public.subdomain_cms (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  user_id uuid,
  subdomain character varying DEFAULT ''::character varying,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT subdomain_cms_pkey PRIMARY KEY (id),
  CONSTRAINT subdomain_cms_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

CREATE TABLE public.work_cms (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  start_date character varying DEFAULT ''::character varying,
  end_date character varying DEFAULT ''::character varying,
  alias character varying DEFAULT ''::character varying,
  description character varying DEFAULT ''::character varying,
  images jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id uuid,
  link character varying DEFAULT ''::character varying,
  skills character varying,
  CONSTRAINT work_cms_pkey PRIMARY KEY (id),
  CONSTRAINT work_cms_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);