import { createClient } from "@supabase/supabase-js";

let supabaseClient = null;

export function getSupabaseAdminClient() {
  if (supabaseClient) {
    return supabaseClient;
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables."
    );
  }

  supabaseClient = createClient(supabaseUrl, serviceRoleKey);
  return supabaseClient;
}
