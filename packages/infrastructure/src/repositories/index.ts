import { AuthRepository, VUserDetailRepository } from '@core/domain';
import { supabase } from '../saas';
import { AuthRepositoryImpl } from './authRepositoryImpl';
import { VUserDetailRepositoryImpl } from './vUserDetailRepositoryImpl';

export const authRepository: AuthRepository = new AuthRepositoryImpl(supabase);
export const vUserDetailRepository: VUserDetailRepository = new VUserDetailRepositoryImpl(supabase);
