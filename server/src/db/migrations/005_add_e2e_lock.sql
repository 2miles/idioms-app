-- Global mutex used to prevent concurrent E2E test runs
CREATE TABLE IF NOT EXISTS public.e2e_lock (
  id integer PRIMARY KEY,
  running boolean NOT NULL,
  updated_at timestamp DEFAULT now()
);

-- Ensure the singleton row exists
INSERT INTO public.e2e_lock (id, running)
VALUES (1, false)
ON CONFLICT (id) DO NOTHING;

COMMENT ON TABLE public.e2e_lock IS
  'Singleton table used as a global mutex to prevent concurrent use of the test database';