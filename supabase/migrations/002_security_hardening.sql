-- HULT PRIZE AASTU - Security Hardening & RLS Policies Migration
-- Run this migration in the Supabase SQL Editor

-- 1. Ensure Row Level Security is strictly enabled
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- 2. Revoke all default table permissions from public and anon
REVOKE ALL ON public.registrations FROM PUBLIC;
REVOKE ALL ON public.registrations FROM anon;

-- Grant minimal required privileges
GRANT INSERT ON public.registrations TO anon;
GRANT ALL ON public.registrations TO authenticated;
GRANT ALL ON public.registrations TO service_role;

-- 3. Drop any outdated or overly permissive policies
DROP POLICY IF EXISTS "Allow public insert" ON public.registrations;
DROP POLICY IF EXISTS "Allow admin select" ON public.registrations;
DROP POLICY IF EXISTS "Allow admin delete" ON public.registrations;
DROP POLICY IF EXISTS "Allow public select" ON public.registrations;
DROP POLICY IF EXISTS "Allow public update" ON public.registrations;
DROP POLICY IF EXISTS "Allow public delete" ON public.registrations;

-- 4. Strict Row Level Security Policies
-- Policy 1: Anonymous users can ONLY insert (cannot read, cannot update, cannot delete)
CREATE POLICY "Strict anon insert only"
  ON public.registrations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy 2: Authenticated organizers/admins can view all registrations
CREATE POLICY "Authenticated admin select"
  ON public.registrations
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy 3: Authenticated organizers/admins can delete registrations
CREATE POLICY "Authenticated admin delete"
  ON public.registrations
  FOR DELETE
  TO authenticated
  USING (true);

-- 5. Database-level Input Constraints (Defense in Depth)
-- Ensure format integrity is guaranteed at the database engine level

-- Check: Student ID format (ETS followed by 4 digits, slash, 2 digits)
ALTER TABLE public.registrations 
  DROP CONSTRAINT IF EXISTS registrations_student_id_format_check;
ALTER TABLE public.registrations 
  ADD CONSTRAINT registrations_student_id_format_check 
  CHECK (student_id ~ '^ETS[0-9]{4}/[0-9]{2}$');

-- Check: Academic year must be one of the recognized years
ALTER TABLE public.registrations 
  DROP CONSTRAINT IF EXISTS registrations_academic_year_check;
ALTER TABLE public.registrations 
  ADD CONSTRAINT registrations_academic_year_check 
  CHECK (academic_year IN ('Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Postgraduate'));

-- Check: Email syntax validation
ALTER TABLE public.registrations 
  DROP CONSTRAINT IF EXISTS registrations_email_format_check;
ALTER TABLE public.registrations 
  ADD CONSTRAINT registrations_email_format_check 
  CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Check: Length boundaries to prevent database buffer/storage abuse
ALTER TABLE public.registrations 
  DROP CONSTRAINT IF EXISTS registrations_field_length_check;
ALTER TABLE public.registrations 
  ADD CONSTRAINT registrations_field_length_check 
  CHECK (
    length(full_name) BETWEEN 2 AND 100 AND
    length(student_id) = 10 AND
    length(email) BETWEEN 5 AND 120 AND
    length(phone) BETWEEN 7 AND 20 AND
    length(department) BETWEEN 2 AND 100 AND
    (team_name IS NULL OR length(team_name) <= 100) AND
    (interest IS NULL OR length(interest) <= 1000)
  );

-- 6. Distributed Rate Limiting Table & Stored Procedure (Vercel Serverless Compatible)
CREATE TABLE IF NOT EXISTS public.rate_limits (
  rate_key TEXT PRIMARY KEY,
  request_count INT NOT NULL DEFAULT 1,
  reset_at TIMESTAMPTZ NOT NULL
);

-- Enable RLS on rate_limits table
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Rate limiting stored procedure
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  rate_key TEXT,
  max_limit INT,
  window_seconds INT
) RETURNS BOOLEAN AS $$
DECLARE
  current_record RECORD;
  now_ts TIMESTAMPTZ := clock_timestamp();
BEGIN
  -- Clean up expired entries in rate_limits
  DELETE FROM public.rate_limits WHERE reset_at <= now_ts;

  SELECT * INTO current_record FROM public.rate_limits WHERE public.rate_limits.rate_key = check_rate_limit.rate_key;

  IF NOT FOUND THEN
    INSERT INTO public.rate_limits (rate_key, request_count, reset_at)
    VALUES (rate_key, 1, now_ts + (window_seconds || ' seconds')::INTERVAL);
    RETURN TRUE;
  ELSIF current_record.request_count < max_limit THEN
    UPDATE public.rate_limits
    SET request_count = request_count + 1
    WHERE public.rate_limits.rate_key = check_rate_limit.rate_key;
    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execution to anon and authenticated
GRANT EXECUTE ON FUNCTION public.check_rate_limit(TEXT, INT, INT) TO anon;
GRANT EXECUTE ON FUNCTION public.check_rate_limit(TEXT, INT, INT) TO authenticated;
