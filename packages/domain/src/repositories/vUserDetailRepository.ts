import { VUserDetails } from '../types';

export interface VUserDetailRepository {
  findByUserId(userId: string): Promise<VUserDetails | undefined>;

  findByScreenName(screenName: string): Promise<VUserDetails | undefined>;
}
