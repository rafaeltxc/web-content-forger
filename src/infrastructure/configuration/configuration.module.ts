import { Module } from '@nestjs/common';
import { StartupConfig } from './startupConfig';

@Module({
  providers: [StartupConfig],
  exports: [StartupConfig]
})
export class ConfigurationModule {}
