import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config();
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY ?? '';
const SUPABASE_URL = process.env.SUPABASE_URL ?? '';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
