import { mock } from 'jest-mock-extended';
import { AuthRepository } from '@core/domain';
import { SignInUseCase } from './index.ts';

describe('SignInUseCase', () => {
  const mockAuthRepository = mock<AuthRepository>();
  const useCase = new SignInUseCase(mockAuthRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('#execute', () => {
    describe('正常系', () => {
      it('apple を渡すと、AuthRepository#signInWithApple が呼ばれること', async () => {
        await useCase.execute('apple');
        expect(mockAuthRepository.signInWithApple).toHaveBeenCalledTimes(1);
        expect(mockAuthRepository.signInWithGoogle).not.toHaveBeenCalled();
        expect(mockAuthRepository.signInWithX).not.toHaveBeenCalled();
        expect(mockAuthRepository.signInWithTwitch).not.toHaveBeenCalled();
        expect(mockAuthRepository.signInWithDiscord).not.toHaveBeenCalled();
        expect(mockAuthRepository.signInWithAnonymous).not.toHaveBeenCalled();
      });

      it('google を渡すと、AuthRepository#signInWithGoogle が呼ばれること', async () => {
        await useCase.execute('google');
        expect(mockAuthRepository.signInWithApple).not.toHaveBeenCalled();
        expect(mockAuthRepository.signInWithGoogle).toHaveBeenCalledTimes(1);
        expect(mockAuthRepository.signInWithX).not.toHaveBeenCalled();
        expect(mockAuthRepository.signInWithTwitch).not.toHaveBeenCalled();
        expect(mockAuthRepository.signInWithDiscord).not.toHaveBeenCalled();
        expect(mockAuthRepository.signInWithAnonymous).not.toHaveBeenCalled();
      });

      it('x を渡すと、AuthRepository#signInWithX が呼ばれること', async () => {
        await useCase.execute('x');
        expect(mockAuthRepository.signInWithApple).not.toHaveBeenCalled();
        expect(mockAuthRepository.signInWithGoogle).not.toHaveBeenCalled();
        expect(mockAuthRepository.signInWithX).toHaveBeenCalledTimes(1);
        expect(mockAuthRepository.signInWithTwitch).not.toHaveBeenCalled();
        expect(mockAuthRepository.signInWithDiscord).not.toHaveBeenCalled();
        expect(mockAuthRepository.signInWithAnonymous).not.toHaveBeenCalled();
      });

      it('twitch を渡すと、AuthRepository#signInWithTwitch が呼ばれること', async () => {
        await useCase.execute('twitch');
        expect(mockAuthRepository.signInWithApple).not.toHaveBeenCalled();
        expect(mockAuthRepository.signInWithGoogle).not.toHaveBeenCalled();
        expect(mockAuthRepository.signInWithX).not.toHaveBeenCalled();
        expect(mockAuthRepository.signInWithTwitch).toHaveBeenCalledTimes(1);
        expect(mockAuthRepository.signInWithDiscord).not.toHaveBeenCalled();
        expect(mockAuthRepository.signInWithAnonymous).not.toHaveBeenCalled();
      });

      it('discord を渡すと、AuthRepository#signInWithDiscord が呼ばれること', async () => {
        await useCase.execute('discord');
        expect(mockAuthRepository.signInWithApple).not.toHaveBeenCalled();
        expect(mockAuthRepository.signInWithGoogle).not.toHaveBeenCalled();
        expect(mockAuthRepository.signInWithX).not.toHaveBeenCalled();
        expect(mockAuthRepository.signInWithTwitch).not.toHaveBeenCalled();
        expect(mockAuthRepository.signInWithDiscord).toHaveBeenCalledTimes(1);
        expect(mockAuthRepository.signInWithAnonymous).not.toHaveBeenCalled();
      });

      it('anonymous を渡すと、AuthRepository#signInWithAnonymous が呼ばれること', async () => {
        await useCase.execute('anonymous');
        expect(mockAuthRepository.signInWithApple).not.toHaveBeenCalled();
        expect(mockAuthRepository.signInWithGoogle).not.toHaveBeenCalled();
        expect(mockAuthRepository.signInWithX).not.toHaveBeenCalled();
        expect(mockAuthRepository.signInWithTwitch).not.toHaveBeenCalled();
        expect(mockAuthRepository.signInWithDiscord).not.toHaveBeenCalled();
        expect(mockAuthRepository.signInWithAnonymous).toHaveBeenCalledTimes(1);
      });
    });
  });
});
