import { authRepository } from '@core/infrastructure';
import { SignInUseCase } from '@core/usecase';
import { UseCaseContainer } from '../contexts/UseCaseContainer';

export const useCaseContainer: UseCaseContainer = {
  signInUseCase: new SignInUseCase(authRepository),
};
