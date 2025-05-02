import { authRepository, vUserDetailRepository } from '@core/infrastructure';
import { FindSuiteUserUseCase, GetCurrentUserIdUseCase, SignInUseCase, SignOutUseCase } from '@core/usecase';
import { UseCaseContainer } from '../contexts';

export const useCaseContainer: UseCaseContainer = {
  findSuiteUserUseCase: new FindSuiteUserUseCase(vUserDetailRepository),
  getCurrentUserIdUseCase: new GetCurrentUserIdUseCase(authRepository),
  signInUseCase: new SignInUseCase(authRepository),
  signOutUseCase: new SignOutUseCase(authRepository),
};
