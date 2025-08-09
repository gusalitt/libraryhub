const supabaseDB = require("@supabase/supabase-js");

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;

const supabase = supabaseDB.createClient(
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY
);

module.exports = supabase;