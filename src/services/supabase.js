import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://tkosyqnvtqnlbizalhro.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrb3N5cW52dHFubGJpemFsaHJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI3MDcxNDMsImV4cCI6MjAzODI4MzE0M30.jIFQHLMsOCf_QdeRvXt4jpdMbWL9cx-_H-C2pCWdwwQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
