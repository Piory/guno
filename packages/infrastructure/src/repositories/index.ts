import { AuthRepository } from '@core/domain';
import { supabase } from '../saas';
import { AuthRepositoryImpl } from './AuthRepositoryImpl';

export const authRepository: AuthRepository = new AuthRepositoryImpl(supabase);
