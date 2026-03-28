import { Module } from '@nestjs/common';

import { StartupConfig } from './startup.configuration';
import { EnvironmentModule } from '../environment/environment.module';
import { ShutdownConfig } from './shutdown.configuration';

@Module({
  providers: [
    StartupConfig, ShutdownConfig
  ],
  exports: [
    StartupConfig, ShutdownConfig
  ],
  imports: [EnvironmentModule]
})
export class ConfigurationModule {}
