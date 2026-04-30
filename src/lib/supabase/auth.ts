import { supabase } from "@/lib/supabase/client";

export const SUPABASE_SESSION_COOKIE = "analystos-supabase-session";
export const FALLBACK_USER_ID = "demo-user";

export async function getCurrentUserId() {
  if (!supabase) {
    return FALLBACK_USER_ID;
  }

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return undefined;
  }

  return data.user.id;
}
