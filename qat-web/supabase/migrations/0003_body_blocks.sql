-- Visual block content for content_items
ALTER TABLE public.content_items
  ADD COLUMN IF NOT EXISTS body_blocks jsonb DEFAULT '[]'::jsonb;
