
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const SUPABASE_URL = 'https://zufohisrbhrsqgtizlgq.supabase.co';
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1Zm9oaXNyYmhyc2dxdGl6bGdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM4ODg4MzksImV4cCI6MjA5OTQ2NDgzOX0.M6Gxd60jvxxJbtzC3dnk2UYqXNNVybb2kuQ1naP6c3g

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
