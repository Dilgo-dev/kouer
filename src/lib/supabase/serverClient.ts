import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { getSupabaseConfig } from "./config";
import type { Database } from "./types";

let cachedClient: SupabaseClient<Database> | null = null;

export function getSupabaseServerClient(): SupabaseClient<Database> | null {
  if (cachedClient) {
    return cachedClient;
  }

  const config = getSupabaseConfig();
  if (!config) {
    return null;
  }

  cachedClient = createClient<Database>(config.url, config.anonKey, {
    auth: { persistSession: false },
  });

  return cachedClient;
}
