const authorizeMock = jest.fn();
jest.mock('react-native-app-auth', () => ({
  authorize: authorizeMock,
}));
jest.mock('@core/shared', () => ({
  OAuthConfig: {
    GOOGLE: {
      issuer: 'https://accounts.google.com',
      clientId: 'google_client_id',
      redirectUrl: 'google_redirect_url',
      scopes: ['openid', 'profile'],
    },
    X: {
      issuer: 'https://x.com',
      clientId: 'x_client_id',
      redirectUrl: 'x_redirect_url',
      scopes: ['openid', 'profile'],
      serviceConfiguration: {
        authorizationEndpoint: 'https://x.com/i/oauth2/authorize',
        tokenEndpoint: 'https://api.x.com/2/oauth2/token',
        revocationEndpoint: 'https://api.x.com/2/oauth2/revoke',
      },
    },
    DISCORD: {
      issuer: 'https://discord.com',
      clientId: 'discord_client_id',
      redirectUrl: 'discord_redirect_url',
      scopes: ['openid', 'identify', 'email'],
      serviceConfiguration: {
        authorizationEndpoint: 'https://discord.com/api/oauth2/authorize',
        tokenEndpoint: 'https://discord.com/api/oauth2/token',
      },
    },
  },
}));

const AuthRepositoryImpl = require('./index.ts').AuthRepositoryImpl;
const OAuthConfig = require('@core/shared').OAuthConfig;

describe('AuthRepositoryImpl', () => {
  const repository = new AuthRepositoryImpl();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('#signInWithGoogle', () => {
    describe('正常系', () => {
      it(`react-native-app-auth の #authorize に ${OAuthConfig.GOOGLE} が渡されていること`, async () => {
        await repository.signInWithGoogle();
        expect(authorizeMock).toHaveBeenCalledWith(OAuthConfig.GOOGLE);
      });
    });
  });

  describe('#signInWithX', () => {
    describe('正常系', () => {
      it(`react-native-app-auth の #authorize に ${OAuthConfig.X} が渡されていること`, async () => {
        await repository.signInWithX();
        expect(authorizeMock).toHaveBeenCalledWith(OAuthConfig.X);
      });
    });
  });

  describe('#signInWithDiscord', () => {
    describe('正常系', () => {
      it(`react-native-app-auth の #authorize に ${OAuthConfig.DISCORD} が渡されていること`, async () => {
        await repository.signInWithDiscord();
        expect(authorizeMock).toHaveBeenCalledWith(OAuthConfig.DISCORD);
      });
    });
  });
});
