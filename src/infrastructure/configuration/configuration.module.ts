import { Module } from '@nestjs/common';
import { StartupConfig } from './startup.configuration';

@Module({
  providers: [StartupConfig],
  exports: [StartupConfig]
})
export class ConfigurationModule {}
