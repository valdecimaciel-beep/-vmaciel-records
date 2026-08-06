// CONFIGURE SEU SUPABASE AQUI
const SUPABASE_URL = 'https://zufohisrbhrsqtizlgq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1Zm9oaXNyYmJocnNxdGl6bGdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzNzYxNDgsImV4cCI6MjA2Njk1MjE0OH0.7r4Z7Zy2-5pX7e8s8h2k9l0m1n2o3p4q5r6s7t8u9v0w';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
console.log('VM IA - Supabase conectado');
