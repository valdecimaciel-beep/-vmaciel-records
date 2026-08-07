// supabase-config.js - PROJETO NOVO valdecimaciel
const SUPABASE_URL = 'https://dxuuxgwjetpqfyltxcsg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4dXV4Z3dqZXRwcWZ5bHR4Y3NnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5ODg2OTYsImV4cCI6MjEwMTU2NDY5Nn0.9IlWI57RVxeXxIv6emXYFD_zU8R5NlI3HBv6UrQ3BsA';

// CORREÇÃO DE SEGURANÇA: Verifica se a biblioteca externa existe antes de criar o cliente
if (typeof supabase === 'undefined') {
  console.error("Erro crítico: A biblioteca de script do Supabase não foi carregada no HTML antes deste arquivo.");
} else if (!window.supabaseClient) {
  // Mudado de window.supabase.createClient para supabase.createClient direto
  window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

const supabaseClient = window.supabaseClient;
var supabase = window.supabaseClient;
