import { SupabaseClient } from '@supabase/supabase-js';
import { Database, VUserDetails } from '@core/domain';
import { VUserDetailRepository } from '@core/domain/src/repositories/vUserDetailRepository.ts';

export class VUserDetailRepositoryImpl implements VUserDetailRepository {
  constructor(private readonly supabase: SupabaseClient<Database>) {}

  async findByUserId(userId: string): Promise<VUserDetails | undefined> {
    const { data } = await this.supabase.from('v_user_details').select().eq('user_id', userId).maybeSingle();
    return data ?? undefined;
  }

  async findByScreenName(screenName: string): Promise<VUserDetails | undefined> {
    const { data } = await this.supabase.from('v_user_details').select().eq('screen_name', screenName).single();
    return data ?? undefined;
  }
}
