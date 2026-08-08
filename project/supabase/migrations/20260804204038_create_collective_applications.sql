/*
# Create collective_applications table (single-tenant, no auth)

1. New Tables
- `collective_applications`
  - `id` (uuid, primary key)
  - `full_name` (text, not null) — applicant's full name
  - `email` (text, not null) — applicant's email
  - `portfolio_url` (text) — GitHub or portfolio link (optional)
  - `research_domain` (text, not null) — area of interest (e.g. "AI & Neural Systems")
  - `pitch` (text, not null) — short pitch / bio
  - `status` (text, default 'pending') — application review status
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `collective_applications`.
- Allow anon + authenticated INSERT only (public can submit applications).
- No SELECT/UPDATE/DELETE for anon (applications are private to operators).
*/

CREATE TABLE IF NOT EXISTS collective_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  portfolio_url text,
  research_domain text NOT NULL,
  pitch text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE collective_applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_collective_applications" ON collective_applications;
CREATE POLICY "anon_insert_collective_applications"
ON collective_applications FOR INSERT
TO anon, authenticated WITH CHECK (true);
