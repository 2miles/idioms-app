--
-- PostgreSQL database dump
--

\restrict h0oxtLFhoD9nWlng9RI7sb2cxpau8spqJj2cQeR9I4ePctsgKlQZ34JRedgvybg

-- Dumped from database version 15.8
-- Dumped by pg_dump version 15.15 (Homebrew)

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


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


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


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: idiom_examples; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.idiom_examples (
    example_id integer DEFAULT nextval('public.idiom_examples_example_id_seq'::regclass) NOT NULL,
    idiom_id integer NOT NULL,
    example text
);


--
-- Name: idiom_origins_ai; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.idiom_origins_ai (
    id integer NOT NULL,
    idiom_id integer NOT NULL,
    origin_text text NOT NULL,
    model text,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


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
-- Name: idiom_origins_ai_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.idiom_origins_ai_id_seq OWNED BY public.idiom_origins_ai.id;


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
-- Name: staging_scrapes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.staging_scrapes (
    id integer NOT NULL,
    idiom_id integer,
    job text NOT NULL,
    content text,
    status text,
    review_status text DEFAULT 'pending'::text
);


--
-- Name: staging_scrapes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.staging_scrapes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: staging_scrapes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.staging_scrapes_id_seq OWNED BY public.staging_scrapes.id;


--
-- Name: user_settings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_settings (
    user_id text NOT NULL,
    theme text NOT NULL,
    CONSTRAINT user_settings_theme_check CHECK ((theme = ANY (ARRAY['light'::text, 'dark'::text, 'system'::text])))
);


--
-- Name: idiom_origins_ai id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.idiom_origins_ai ALTER COLUMN id SET DEFAULT nextval('public.idiom_origins_ai_id_seq'::regclass);


--
-- Name: staging_scrapes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.staging_scrapes ALTER COLUMN id SET DEFAULT nextval('public.staging_scrapes_id_seq'::regclass);


--
-- Name: idiom_origins_ai idiom_origins_ai_idiom_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.idiom_origins_ai
    ADD CONSTRAINT idiom_origins_ai_idiom_unique UNIQUE (idiom_id);


--
-- Name: idiom_origins_ai idiom_origins_ai_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.idiom_origins_ai
    ADD CONSTRAINT idiom_origins_ai_pkey PRIMARY KEY (id);


--
-- Name: idiom_examples idioms_examples_test_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.idiom_examples
    ADD CONSTRAINT idioms_examples_test_pkey PRIMARY KEY (example_id);


--
-- Name: idioms idioms_test_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.idioms
    ADD CONSTRAINT idioms_test_pkey PRIMARY KEY (id);


--
-- Name: requests requests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_pkey PRIMARY KEY (id);


--
-- Name: staging_scrapes staging_scrapes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.staging_scrapes
    ADD CONSTRAINT staging_scrapes_pkey PRIMARY KEY (id);


--
-- Name: user_settings user_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_settings
    ADD CONSTRAINT user_settings_pkey PRIMARY KEY (user_id);


--
-- Name: idiom_origins_ai idiom_origins_ai_idiom_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.idiom_origins_ai
    ADD CONSTRAINT idiom_origins_ai_idiom_id_fkey FOREIGN KEY (idiom_id) REFERENCES public.idioms(id) ON DELETE CASCADE;


--
-- Name: idiom_examples idioms_examples_test_idiom_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.idiom_examples
    ADD CONSTRAINT idioms_examples_test_idiom_id_fkey FOREIGN KEY (idiom_id) REFERENCES public.idioms(id) ON DELETE CASCADE;


--
-- Name: staging_scrapes staging_scrapes_idiom_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.staging_scrapes
    ADD CONSTRAINT staging_scrapes_idiom_id_fkey FOREIGN KEY (idiom_id) REFERENCES public.idioms(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict h0oxtLFhoD9nWlng9RI7sb2cxpau8spqJj2cQeR9I4ePctsgKlQZ34JRedgvybg

