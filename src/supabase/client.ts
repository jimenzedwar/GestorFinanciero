import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { REACT_APP_SUPABASE_ANON_KEY, REACT_APP_SUPABASE_URL } from '../env';

export const client: SupabaseClient = createClient(
    REACT_APP_SUPABASE_URL, 
    REACT_APP_SUPABASE_ANON_KEY
);
