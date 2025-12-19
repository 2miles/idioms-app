--
-- PostgreSQL database dump
--

\restrict jkr46CZlqIGBhWnyVcajX2jK6u79KeH4vrVkL1H9nM4f1f2KebnMX9RHnGlraq8

-- Dumped from database version 16.8 (Debian 16.8-1.pgdg120+1)
-- Dumped by pg_dump version 16.11 (Homebrew)

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

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: e2e_lock; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.e2e_lock (
    id integer NOT NULL,
    running boolean NOT NULL,
    updated_at timestamp without time zone DEFAULT now()
);


--
-- Name: idiom_examples; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.idiom_examples (
    example_id integer NOT NULL,
    idiom_id integer NOT NULL,
    example text
);


--
-- Name: idiom_examples_example_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.idiom_examples_example_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: idiom_examples_example_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.idiom_examples_example_id_seq OWNED BY public.idiom_examples.example_id;


--
-- Name: idiom_origins_ai_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.idiom_origins_ai_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: idiom_origins_ai; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.idiom_origins_ai (
    id integer DEFAULT nextval('public.idiom_origins_ai_id_seq'::regclass) NOT NULL,
    idiom_id integer NOT NULL,
    origin_text text,
    model text,
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: idioms_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.idioms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: idioms; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.idioms (
    id integer DEFAULT nextval('public.idioms_id_seq'::regclass) NOT NULL,
    title character varying(255),
    title_general character varying(255),
    definition text,
    contributor character varying(50),
    timestamps timestamp with time zone
);


--
-- Name: requests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.requests (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    contributor text,
    submitted_at timestamp with time zone DEFAULT now(),
    added boolean DEFAULT false
);


--
-- Name: user_settings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_settings (
    user_id text NOT NULL,
    theme text NOT NULL,
    CONSTRAINT user_settings_theme_check CHECK ((theme = ANY (ARRAY['light'::text, 'dark'::text, 'system'::text])))
);


--
-- Name: idiom_examples example_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.idiom_examples ALTER COLUMN example_id SET DEFAULT nextval('public.idiom_examples_example_id_seq'::regclass);


--
-- Name: e2e_lock e2e_lock_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.e2e_lock
    ADD CONSTRAINT e2e_lock_pkey PRIMARY KEY (id);


--
-- Name: idiom_examples idiom_examples_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.idiom_examples
    ADD CONSTRAINT idiom_examples_pkey PRIMARY KEY (example_id);


--
-- Name: idiom_origins_ai idiom_origins_ai_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.idiom_origins_ai
    ADD CONSTRAINT idiom_origins_ai_pkey PRIMARY KEY (id);


--
-- Name: idioms idioms_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.idioms
    ADD CONSTRAINT idioms_pkey PRIMARY KEY (id);


--
-- Name: requests requests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_pkey PRIMARY KEY (id);


--
-- Name: user_settings user_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_settings
    ADD CONSTRAINT user_settings_pkey PRIMARY KEY (user_id);


--
-- Name: idiom_examples idiom_examples_idiom_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.idiom_examples
    ADD CONSTRAINT idiom_examples_idiom_id_fkey FOREIGN KEY (idiom_id) REFERENCES public.idioms(id) ON DELETE CASCADE;


--
-- Name: idiom_origins_ai idiom_origins_ai_idiom_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.idiom_origins_ai
    ADD CONSTRAINT idiom_origins_ai_idiom_id_fkey FOREIGN KEY (idiom_id) REFERENCES public.idioms(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict jkr46CZlqIGBhWnyVcajX2jK6u79KeH4vrVkL1H9nM4f1f2KebnMX9RHnGlraq8

