import { AuthRepository } from '@core/domain';
import { AuthRepositoryImpl } from '@core/infrastructure';
import { DI_TYPES, DIContainer } from '@core/shared';

DIContainer.register<AuthRepository>(DI_TYPES.AuthRepository, AuthRepositoryImpl);
