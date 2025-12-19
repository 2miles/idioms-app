CREATE TABLE IF NOT EXISTS public.staging_scrapes (
  id integer NOT NULL,
  idiom_id integer,
  job text NOT NULL,
  content text,
  status text,
  review_status text DEFAULT 'pending'::text
);

CREATE SEQUENCE IF NOT EXISTS public.staging_scrapes_id_seq
  AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE public.staging_scrapes_id_seq
  OWNED BY public.staging_scrapes.id;

ALTER TABLE ONLY public.staging_scrapes
  ALTER COLUMN id SET DEFAULT nextval('public.staging_scrapes_id_seq'::regclass);

ALTER TABLE ONLY public.staging_scrapes
  ADD CONSTRAINT staging_scrapes_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.staging_scrapes
  ADD CONSTRAINT staging_scrapes_idiom_id_fkey
  FOREIGN KEY (idiom_id) REFERENCES public.idioms(id) ON DELETE CASCADE;