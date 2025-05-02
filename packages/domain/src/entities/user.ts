import { AuthProviderType } from '../types';

export class User {
  constructor(
    private readonly id: string,
    private readonly displayName: string,
    private readonly email: string,
    private readonly providers: AuthProviderType[],
    private readonly isAnonymous: boolean,
    private readonly createdAt: Date,
    private readonly lastSignInAt: Date | undefined,
  ) {}
}
