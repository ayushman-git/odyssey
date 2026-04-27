import { createClient } from "@supabase/supabase-js";
import { getCoreServerEnv } from "@/lib/env";

let supabaseClient = null;

export function getSupabaseAdminClient() {
  if (supabaseClient) {
    return supabaseClient;
  }

  const { supabaseUrl, supabaseServiceRoleKey } = getCoreServerEnv();
  supabaseClient = createClient(supabaseUrl, supabaseServiceRoleKey);
  return supabaseClient;
}
