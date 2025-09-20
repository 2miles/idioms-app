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
8	3	They said the flight might leave on time, but don’t hold your breath.
9	3	She’s hoping the noisy neighbors will move out, but I wouldn’t hold my breath.
10	3	I’m supposed to get a promotion, but I won’t hold my breath.
11	3	My son promised to clean his room, but honestly, don’t hold your breath.
12	3	Did Mary promise to pay you back tomorrow? Well, don’t hold your breath. She’s notorious for ripping people off.
13	3	They said they’d fix the potholes in front of my house by next week, but I won’t hold my breath.
14	4	Henry, stop, you know what they say about stones and glass houses. 
15	4	I don’t think you should really go there, Anna, those who live in glass houses shouldn’t throw stones. 
16	4	You know that old proverb about glass houses and stones? Well, I think it applies here. 
17	4	I’ve near heard anything more hypocritical. Have they never heard the proverb "those who live in glass houses shouldn’t throw stones" in Washington? 
18	5	I know you don’t like the dress very much, but it was a gift; you should not look a gift horse in the mouth.
19	5	Don’t look a gift horse in the mouth, be grateful for what you have received.
20	5	He gave his old car as a gift; I know its not a great one, but I wouldn’t look a gift horse in the mouth.
21	5	It’s not what you were hoping for, but it’s the best he could afford; I would advise you not to look a gift horse in the mouth.
22	5	If I were you, I wouldn’t look a gift horse in the mouth. Just be grateful that he was kind enough to give you his old watch when you needed one.
23	6	Before committing to make the payment, wait till you receive the money from the bank. Don’t count your chickens before they hatch.
24	6	Though he was leading the race, he had started celebrating even before the finish line, and in the process lost his lead. He had counted his chickens before they hatched.
25	6	You may get the job, but don’t count your chickens before they hatch; wait till you get the offer letter before you throw the party.
26	6	Why not wait till you get the confirmation? Aren’t you counting your chickens before they have hatched?
27	7	It would be better if you applied to several companies instead of just one; don’t put all your eggs in one basket.
28	7	It is wise to diversify your investments across different instruments, as you should not put all your eggs in one basket.
29	7	Why are you putting all your money into one company? Don’t put all your eggs in one basket.
30	7	He was depending heavily on the success of his venture, but when it failed, he was ruined. He realized that he should not have put all his eggs in one basket.
31	7	He was able to recover from his losses because he didn’t put all his eggs in one basket.
32	7	You’d better acquire a new skill; don’t put all your eggs in one basket.
33	7	People who don’t put all their eggs in one basket have shielded themselves from situations of crisis.
34	8	You may not like your job, but don’t quit merely on the hope of finding a better one. A bird in the hand is worth two in the bush.
35	8	I might have got a better offer if I had waited for some more time, but I decided to take the one I had. After all, a bird in the hand is worth two in the bush.
36	8	He decided against selling off his small business for the prospects of starting a bigger one. He realized that a bird in the hand is worth two in the bush.
37	8	Do not put your life’s savings into risky investments in the hope of higher returns. You may lose everything. Don’t you know, a bird in the hand is worth two in the bush.
38	9	I know you think your way is the only way to do things, but there’s more than one way to skin a cat.
39	9	It’s hard to solve this problem; don’t just focus on one solution. Remember, there’s more than one way to skin a cat.
40	9	You should know that you are both right, after all, there’s more than one way to skin a cat.
41	10	I wanted to keep my job offer a secret, but my little brother overheard and let the cat out of the bag.
42	10	The movie trailer was supposed to be a surprise, but a blogger let the cat out of the bag a day early.
43	10	The team had a special strategy for the finals, but an interview with one of the players let the cat out of the bag.
44	10	The kids had baked a cake for their parents’ anniversary, but the smell from the kitchen let the cat out of the bag.
45	10	She had promised not to reveal the gender of her baby, but during a chat, she inadvertently let the cat out of the bag.
\.

COPY public.idioms (id, title, title_general, definition, contributor, timestamps) FROM stdin;
1	Not my circus, not my monkeys	Not my circus, not my monkeys	This troublesome, burdensome, or volatile situation is none of my concern, and thus I refuse to get involved in it. A loan translation of the Polish idio.	Eve	2023-07-13 00:00:01-07
2	Waiting with baited breath	Wait with bated breath	To remain in a state of eager anticipation (of or for something).	Eve	2023-07-13 00:00:02-07
3	Don’t hold your breath	Don’t hold your breath	Don’t expect something to happen. (The idea being that one couldn’t hold one’s breath long enough for the unlikely thing to happen.)	\N	2023-07-13 00:00:03-07
4	People in glass houses shouldn’t throw stones	People (who live) in glass houses shouldn’t throw stones.	People who are vulnerable to criticism should not criticize others, especially not for the faults that they themselves have (since such criticism will likely be returned).	\N	2023-07-13 00:00:04-07
5	Don’t look a gift horse in the mouth	Don’t look a gift horse in the mouth	If you receive a gift, do so graciously, without voicing criticisms. The saying is attributed to St. Jerome and refers to the practice of looking at a horse’s teeth to determine its age.	\N	2023-07-13 00:00:05-07
6	Don’t count your chickens before they hatch	Don’t count your chickens before they hatch.	Don’t make plans based on future events, outcomes, or successes that might not come to pass.	\N	2023-07-13 00:00:06-07
7	Don’t keep all your eggs in one basket	put all (one’s) eggs in one basket	To invest, devote, or commit all of one’s energy or resources into a single venture, opportunity, or goal, generally at the risk of losing everything in the event that that thing fails or does not come to fruition.	\N	2023-07-13 00:00:07-07
8	A bird in the hand is worth two in the bush	A bird in the hand is worth two in the bush	It is better to have something less valuable than to pursue something more valuable that may not be able to be obtained.	\N	2023-07-13 00:00:08-07
9	There’s more than one way to skin a cat	There’s more than one way to skin a cat	There are many methods one may employ in achieving one’s ends.	Miles	2023-07-13 00:00:09-07
10	Let the cat out of the bag	Let the cat out of the bag	To reveal a secret.	\N	2023-07-13 00:00:10-07
\.

-- Seed test requests
COPY public.requests (id, title, contributor, submitted_at, added) FROM stdin;
550e8400-e29b-41d4-a716-446655440000	A watched pot never boils	Christina	2025-01-01 12:00:00-07	false
550e8400-e29b-41d4-a716-446655440001	When pigs fly	Miles	2025-01-02 12:00:00-07	false
550e8400-e29b-41d4-a716-446655440002	Kick the bucket	TestUser	2025-01-03 12:00:00-07	true
\.


SELECT pg_catalog.setval('public.idiom_examples_example_id_seq', 674, true);

SELECT pg_catalog.setval('public.idioms_id_seq', 151, true);

ALTER TABLE ONLY public.idiom_examples
    ADD CONSTRAINT idiom_examples_pkey PRIMARY KEY (example_id);

ALTER TABLE ONLY public.idioms
    ADD CONSTRAINT idioms_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.idiom_examples
    ADD CONSTRAINT idiom_examples_idiom_id_fkey
    FOREIGN KEY (idiom_id)
    REFERENCES public.idioms(id)
    ON DELETE CASCADE;