import { container } from 'tsyringe';
import { constructor } from 'tsyringe/dist/typings/types';

export const DI_TYPES = {
  AuthRepository: Symbol.for('AuthRepository'),
};

export class DIContainer {
  static resolve<T>(token: symbol | constructor<T>): T {
    return container.resolve<T>(token);
  }

  static register<T>(token: symbol | constructor<T>, implementation: constructor<T>) {
    container.registerSingleton<T>(token, implementation);
  }
}
