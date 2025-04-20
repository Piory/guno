import { AuthRepositoryImpl } from '@core/infrastructure';
import { AuthRepository } from '@core/domain';
import { DIContainer, DI_TYPES } from './DIContainer';

DIContainer.register<AuthRepository>(DI_TYPES.AuthRepository, AuthRepositoryImpl);

export * from './DIContainer';
