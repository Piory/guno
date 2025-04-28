import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { SupabaseConfig } from '@core/shared';

export const supabase = createClient(SupabaseConfig.SUPABSE_URL!, SupabaseConfig.SUPABASE_ANON_KEY!, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
