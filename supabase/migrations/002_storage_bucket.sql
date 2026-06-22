-- Portfolio image uploads (Supabase Storage)
-- Run in Supabase SQL Editor after 001_initial_schema.sql

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'portfolio',
  'portfolio',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

CREATE POLICY "public_read_portfolio_images"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio');
