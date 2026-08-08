/*
# Create community platform tables (single-tenant, no auth)

1. New Tables
- `node_profiles` — user skill profiles created via Node Activation
  - `id` (uuid, pk), `node_id` (text, unique), `display_name` (text), `email` (text),
    `skills` (text[]), `status` (text: seeking_squad/available_gigs/building_project),
    `bio` (text), `avatar_color` (text), `created_at` (timestamptz)
- `forge_pitches` — R&D / startup pitch cards
  - `id` (uuid, pk), `title` (text), `abstract` (text), `creator_node_id` (text),
    `required_roles` (text[]), `skills` (text[]), `created_at` (timestamptz)
- `gig_directives` — micro-task / freelance gig board
  - `id` (uuid, pk), `title` (text), `description` (text), `bounty` (numeric),
    `required_skills` (text[]), `status` (text: open/assigned/completed), `created_at` (timestamptz)
- `vault_resources` — community-curated learning resources
  - `id` (uuid, pk), `title` (text), `type` (text: roadmap/snippet/paper),
    `description` (text), `tags` (text[]), `url` (text), `contributor` (text), `created_at` (timestamptz)

2. Security
- Enable RLS on all tables.
- Allow anon + authenticated INSERT (public can submit entries).
- Allow anon + authenticated SELECT (all data is intentionally public/shared).
- No UPDATE/DELETE for anon (entries are managed by operators).
*/

CREATE TABLE IF NOT EXISTS node_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  node_id text UNIQUE NOT NULL,
  display_name text NOT NULL,
  email text,
  skills text[] DEFAULT '{}',
  status text NOT NULL DEFAULT 'seeking_squad',
  bio text,
  avatar_color text DEFAULT 'from-cyan-500 to-indigo-500',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE node_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_node_profiles" ON node_profiles;
CREATE POLICY "anon_select_node_profiles" ON node_profiles FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_node_profiles" ON node_profiles;
CREATE POLICY "anon_insert_node_profiles" ON node_profiles FOR INSERT
TO anon, authenticated WITH CHECK (true);

CREATE TABLE IF NOT EXISTS forge_pitches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  abstract text NOT NULL,
  creator_node_id text NOT NULL,
  required_roles text[] DEFAULT '{}',
  skills text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE forge_pitches ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_forge_pitches" ON forge_pitches;
CREATE POLICY "anon_select_forge_pitches" ON forge_pitches FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_forge_pitches" ON forge_pitches;
CREATE POLICY "anon_insert_forge_pitches" ON forge_pitches FOR INSERT
TO anon, authenticated WITH CHECK (true);

CREATE TABLE IF NOT EXISTS gig_directives (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  bounty numeric DEFAULT 0,
  required_skills text[] DEFAULT '{}',
  status text NOT NULL DEFAULT 'open',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gig_directives ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_gig_directives" ON gig_directives;
CREATE POLICY "anon_select_gig_directives" ON gig_directives FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_gig_directives" ON gig_directives;
CREATE POLICY "anon_insert_gig_directives" ON gig_directives FOR INSERT
TO anon, authenticated WITH CHECK (true);

CREATE TABLE IF NOT EXISTS vault_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL DEFAULT 'roadmap',
  description text NOT NULL,
  tags text[] DEFAULT '{}',
  url text,
  contributor text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE vault_resources ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_vault_resources" ON vault_resources;
CREATE POLICY "anon_select_vault_resources" ON vault_resources FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_vault_resources" ON vault_resources;
CREATE POLICY "anon_insert_vault_resources" ON vault_resources FOR INSERT
TO anon, authenticated WITH CHECK (true);
