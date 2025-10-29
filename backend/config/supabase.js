import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.ApiKey,
  process.env.UrlGetAll
);

export default supabase;
