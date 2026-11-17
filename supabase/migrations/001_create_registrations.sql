-- Hult Prize OnCampus - Database Schema
-- Run this in the Supabase SQL Editor (Project > SQL Editor > New query)

-- Create registrations table
CREATE TABLE IF NOT EXISTS public.registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  student_id TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  department TEXT NOT NULL,
  academic_year TEXT NOT NULL,
  team_status TEXT NOT NULL CHECK (team_status IN ('has_team', 'looking_for_team', 'want_to_learn')),
  team_name TEXT,
  interest TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Allow public INSERT (students can register without being logged in)
CREATE POLICY "Allow public insert"
  ON public.registrations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users (admins) to SELECT all registrations
CREATE POLICY "Allow admin select"
  ON public.registrations
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users (admins) to DELETE registrations
CREATE POLICY "Allow admin delete"
  ON public.registrations
  FOR DELETE
  TO authenticated
  USING (true);
