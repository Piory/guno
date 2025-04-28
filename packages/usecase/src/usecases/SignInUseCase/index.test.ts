import { AuthRepository } from '@core/domain';
import { SignInUseCase } from './index.ts';

describe('SignInUseCase', () => {
  const signInWithAppleMock = jest.fn();
  const signInWithGoogleMock = jest.fn();
  const signInWithXMock = jest.fn();
  const signInWithTwitchMock = jest.fn();
  const signInWithDiscordMock = jest.fn();
  const signInWithAnonymousMock = jest.fn();
  const signOutMock = jest.fn();
  const AuthRepositoryMock = jest.fn<AuthRepository, []>().mockImplementation(() => ({
    signInWithApple: signInWithAppleMock,
    signInWithGoogle: signInWithGoogleMock,
    signInWithX: signInWithXMock,
    signInWithTwitch: signInWithTwitchMock,
    signInWithDiscord: signInWithDiscordMock,
    signInWithAnonymous: signInWithAnonymousMock,
    signOut: signOutMock,
  }));
  const useCase = new SignInUseCase(new AuthRepositoryMock());

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('#execute', () => {
    describe('正常系', () => {
      it('apple を渡すと、AuthRepository#signInWithApple が呼ばれること', async () => {
        await useCase.execute('apple');
        expect(signInWithAppleMock).toHaveBeenCalledTimes(1);
        expect(signInWithGoogleMock).not.toHaveBeenCalled();
        expect(signInWithXMock).not.toHaveBeenCalled();
        expect(signInWithTwitchMock).not.toHaveBeenCalled();
        expect(signInWithDiscordMock).not.toHaveBeenCalled();
        expect(signInWithAnonymousMock).not.toHaveBeenCalled();
        expect(signOutMock).not.toHaveBeenCalled();
      });

      it('google を渡すと、AuthRepository#signInWithGoogle が呼ばれること', async () => {
        await useCase.execute('google');
        expect(signInWithAppleMock).not.toHaveBeenCalled();
        expect(signInWithGoogleMock).toHaveBeenCalledTimes(1);
        expect(signInWithXMock).not.toHaveBeenCalled();
        expect(signInWithTwitchMock).not.toHaveBeenCalled();
        expect(signInWithDiscordMock).not.toHaveBeenCalled();
        expect(signInWithAnonymousMock).not.toHaveBeenCalled();
        expect(signOutMock).not.toHaveBeenCalled();
      });

      it('x を渡すと、AuthRepository#signInWithX が呼ばれること', async () => {
        await useCase.execute('x');
        expect(signInWithAppleMock).not.toHaveBeenCalled();
        expect(signInWithGoogleMock).not.toHaveBeenCalled();
        expect(signInWithXMock).toHaveBeenCalledTimes(1);
        expect(signInWithTwitchMock).not.toHaveBeenCalled();
        expect(signInWithDiscordMock).not.toHaveBeenCalled();
        expect(signInWithAnonymousMock).not.toHaveBeenCalled();
        expect(signOutMock).not.toHaveBeenCalled();
      });

      it('twitch を渡すと、AuthRepository#signInWithTwitch が呼ばれること', async () => {
        await useCase.execute('twitch');
        expect(signInWithAppleMock).not.toHaveBeenCalled();
        expect(signInWithGoogleMock).not.toHaveBeenCalled();
        expect(signInWithXMock).not.toHaveBeenCalled();
        expect(signInWithTwitchMock).toHaveBeenCalledTimes(1);
        expect(signInWithDiscordMock).not.toHaveBeenCalled();
        expect(signInWithAnonymousMock).not.toHaveBeenCalled();
        expect(signOutMock).not.toHaveBeenCalled();
      });

      it('discord を渡すと、AuthRepository#signInWithDiscord が呼ばれること', async () => {
        await useCase.execute('discord');
        expect(signInWithAppleMock).not.toHaveBeenCalled();
        expect(signInWithGoogleMock).not.toHaveBeenCalled();
        expect(signInWithXMock).not.toHaveBeenCalled();
        expect(signInWithTwitchMock).not.toHaveBeenCalled();
        expect(signInWithDiscordMock).toHaveBeenCalledTimes(1);
        expect(signInWithAnonymousMock).not.toHaveBeenCalled();
        expect(signOutMock).not.toHaveBeenCalled();
      });

      it('anonymous を渡すと、AuthRepository#signInWithAnonymous が呼ばれること', async () => {
        await useCase.execute('anonymous');
        expect(signInWithAppleMock).not.toHaveBeenCalled();
        expect(signInWithGoogleMock).not.toHaveBeenCalled();
        expect(signInWithXMock).not.toHaveBeenCalled();
        expect(signInWithTwitchMock).not.toHaveBeenCalled();
        expect(signInWithDiscordMock).not.toHaveBeenCalled();
        expect(signInWithAnonymousMock).toHaveBeenCalledTimes(1);
        expect(signOutMock).not.toHaveBeenCalled();
      });
    });
  });
});
