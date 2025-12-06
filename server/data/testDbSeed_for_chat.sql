-- PostgreSQL database dump
-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

-- Stores per-user preferences such as dark mode
CREATE TABLE IF NOT EXISTS public.user_settings (
    user_id text PRIMARY KEY,
    theme text NOT NULL CHECK (theme IN ('light','dark','system'))
);

ALTER TABLE public.user_settings OWNER TO postgres;

-- Optional: seed a test user setting
-- COPY public.user_settings (user_id, theme) FROM stdin;
-- auth0|testuserid   dark
-- \.

CREATE TABLE public.idiom_examples (
    example_id integer NOT NULL,
    idiom_id integer NOT NULL,
    example text
);

ALTER TABLE public.idiom_examples OWNER TO postgres;

CREATE SEQUENCE public.idiom_examples_example_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.idiom_examples_example_id_seq OWNER TO postgres;

ALTER SEQUENCE public.idiom_examples_example_id_seq OWNED BY public.idiom_examples.example_id;

CREATE SEQUENCE public.idioms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.idioms_id_seq OWNER TO postgres;

CREATE TABLE public.idioms (
    id integer DEFAULT nextval('public.idioms_id_seq'::regclass) NOT NULL,
    title character varying(255),
    title_general character varying(255),
    definition text,
    contributor character varying(50),
    timestamps timestamp with time zone
);

ALTER TABLE public.idioms OWNER TO postgres;


-- Sequence for origins.id
CREATE SEQUENCE public.origins_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.origins_id_seq OWNER TO postgres;

-- Origins table: one origin row per idiom
CREATE TABLE public.origins (
    id integer NOT NULL DEFAULT nextval('public.origins_id_seq'::regclass),
    idiom_id integer NOT NULL,
    origin_text text,
    model text,
    updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.origins OWNER TO postgres;

-- Stores idiom requests submitted by users
CREATE TABLE public.requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    contributor TEXT,
    submitted_at TIMESTAMPTZ DEFAULT now(),
    added BOOLEAN DEFAULT false
);

ALTER TABLE public.requests OWNER TO postgres;

-- Tracks whether E2E tests are currently running (used for local locking)
CREATE TABLE public.e2e_lock (
    id INT PRIMARY KEY,
    running BOOLEAN NOT NULL,
    updated_at TIMESTAMP DEFAULT now()
);

ALTER TABLE public.e2e_lock OWNER TO postgres;

-- Seed row for e2e_lock to initialize it in the "not running" state
COPY public.e2e_lock (id, running, updated_at) FROM stdin;
1	false	2025-01-01 00:00:00
\.

ALTER TABLE ONLY public.idiom_examples ALTER COLUMN example_id SET DEFAULT nextval('public.idiom_examples_example_id_seq'::regclass);

COPY public.idiom_examples (example_id, idiom_id, example) FROM stdin;
1	1	I didn’t want the after effects of involving myself in their drama at the time. Later, when things had calmed down, I told the chef that it was not my circus, not my monkeys. He laughed, and we went back to work.
2	1	All this fuss going on at the moment about the lack of government funding for preschool childcare so mothers can work? Sorry, not my circus, not my monkeys
3	2	The audience watched with bated breath as the magician performed his final trick.
4	2	She waited with bated breath for the results of her medical test.
5	2	With bated breath, the crowd awaited the announcement of the winner.
6	2	The children listened with bated breath to the storyteller’s suspenseful tale.
7	2	He waited with bated breath to see if his job application was successful.
-- many entries removed for brevity --
671	149	I wish Mr. and Mrs. Franklin would bury the hatchet. They argue all the time.
672	150	Our analysts think that the marketing campaign will reinvigorate our sales, but the proof is in the pudding, so let’s see how our figures look at the end of the year.
673	150	OK, if I did everything right, the engine should work right, but the proof will be in the pudding.
\.

COPY public.idioms (id, title, title_general, definition, contributor, timestamps) FROM stdin;
1	Not my circus, not my monkeys	Not my circus, not my monkeys	This troublesome, burdensome, or volatile situation is none of my concern, and thus I refuse to get involved in it. A loan translation of the Polish idio.	Eve	2023-07-13 00:00:01-07
2	Waiting with baited breath	Wait with bated breath	To remain in a state of eager anticipation (of or for something).	Eve	2023-07-13 00:00:02-07
3	Don’t hold your breath	Don’t hold your breath	Don’t expect something to happen. (The idea being that one couldn’t hold one’s breath long enough for the unlikely thing to happen.)	\N	2023-07-13 00:00:03-07
-- many entries removed for brevity --
146	Got a screw loose	\N	\N	Miles	2023-07-14 00:00:19-07
147	Walk a mile in someone’s shoes	Walk a mile in (someone’s) shoes	To spend time trying to consider or understand another person’s perspectives, experiences, or motivations before making a judgment about them.	Miles	2023-07-14 00:00:20-07
148	This isn’t my first rodeo	Not (one’s) first rodeo	One is experienced with a certain situation, especially in relation to potential pitfalls or deceitful practices by others.	Miles	2023-07-14 00:00:21-07
149	Bury the hatchet	Bury the hatchet	To make peace with someone.	Miles	2023-07-14 00:22:00-07
150	Proof is in the pudding	The proof is in the pudding	The final results of something are the only way to judge its quality or veracity.	Eve	2023-07-14 00:23:00-07
\.

-- Seed origins for some idioms used in tests
COPY public.origins (id, idiom_id, origin_text, model, updated_at) FROM stdin;
1	1	“Not my circus, not my monkeys” is a loan translation of the Polish saying “Nie mój cyrk, nie moje małpy,” used to mean “this situation is not my responsibility.”	gpt-5.1	2025-01-01 00:00:00-07
2	2	“Wait with bated breath” goes back to Shakespeare’s usage of “bated” as “abated,” meaning held or restrained. The idiom describes anxious or excited anticipation.	manual	2025-01-01 00:05:00-07
\.

-- Seed test requests
COPY public.requests (id, title, contributor, submitted_at, added) FROM stdin;
550e8400-e29b-41d4-a716-446655440000	A watched pot never boils	Christina	2025-01-01 12:00:00-07	false
550e8400-e29b-41d4-a716-446655440001	When pigs fly	Miles	2025-01-02 12:00:00-07	false
550e8400-e29b-41d4-a716-446655440002	Kick the bucket	TestUser	2025-01-03 12:00:00-07	true
\.

SELECT pg_catalog.setval('public.idiom_examples_example_id_seq', 674, true);

SELECT pg_catalog.setval('public.idioms_id_seq', 151, true);

SELECT pg_catalog.setval('public.origins_id_seq', 3, true);


ALTER TABLE ONLY public.idiom_examples
    ADD CONSTRAINT idiom_examples_pkey PRIMARY KEY (example_id);

ALTER TABLE ONLY public.idioms
    ADD CONSTRAINT idioms_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.idiom_examples
    ADD CONSTRAINT idiom_examples_idiom_id_fkey
    FOREIGN KEY (idiom_id)
    REFERENCES public.idioms(id)
    ON DELETE CASCADE;

ALTER TABLE ONLY public.origins
    ADD CONSTRAINT origins_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.origins
    ADD CONSTRAINT origins_idiom_id_fkey
    FOREIGN KEY (idiom_id)
    REFERENCES public.idioms(id)
    ON DELETE CASCADE;