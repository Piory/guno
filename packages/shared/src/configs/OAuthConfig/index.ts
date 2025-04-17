import { AuthConfiguration } from 'react-native-app-auth';
import { Config } from 'react-native-config';

export class OAuthConfig {
  private static readonly GOOGLE_OAUTH_REDIRECT_URL = `${Config.GOOGLE_OAUTH_URL_SCHEME}:/${Config.OAUTH_REDIRECT_URL_PATH}`;
  private static readonly OAUTH_REDIRECT_URL = `${Config.APP_ID}://${Config.OAUTH_REDIRECT_URL_PATH}`;

  static readonly GOOGLE: AuthConfiguration = {
    issuer: 'https://accounts.google.com',
    clientId: Config.GOOGLE_OAUTH_CLIENT_ID,
    redirectUrl: OAuthConfig.GOOGLE_OAUTH_REDIRECT_URL,
    scopes: ['openid', 'profile'],
  };

  static readonly DISCORD: AuthConfiguration = {
    issuer: 'https://discord.com',
    clientId: Config.DISCORD_OAUTH_CLIENT_ID,
    redirectUrl: OAuthConfig.OAUTH_REDIRECT_URL,
    scopes: ['openid', 'identify', 'email'],
    serviceConfiguration: {
      authorizationEndpoint: 'https://discord.com/api/oauth2/authorize',
      tokenEndpoint: 'https://discord.com/api/oauth2/token',
    },
  };
}
