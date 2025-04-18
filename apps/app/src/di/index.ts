import { DIContainer, DI_TYPES } from '@core/shared';
import { AuthRepositoryImpl } from '@core/infrastructure';
import { AuthRepository } from '@core/domain';

DIContainer.register<AuthRepository>(DI_TYPES.AuthRepository, AuthRepositoryImpl);
