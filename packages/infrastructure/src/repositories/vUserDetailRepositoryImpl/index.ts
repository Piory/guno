import { SupabaseClient } from '@supabase/supabase-js';
import { Database, VUserDetailRepository, VUserDetails } from '@core/domain';

export class VUserDetailRepositoryImpl implements VUserDetailRepository {
  constructor(private readonly supabase: SupabaseClient<Database>) {}

  async findByUserId(userId: string): Promise<VUserDetails | undefined> {
    const { data } = await this.supabase.from('v_user_details').select().eq('user_id', userId).maybeSingle();
    return data ?? undefined;
  }

  async findByScreenName(screenName: string): Promise<VUserDetails | undefined> {
    const { data } = await this.supabase.from('v_user_details').select().eq('screen_name', screenName).maybeSingle();
    return data ?? undefined;
  }
}
