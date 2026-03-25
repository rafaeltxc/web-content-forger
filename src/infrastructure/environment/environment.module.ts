import { Module } from '@nestjs/common';
import { EnvironmentConfig } from './environment.configuration';

@Module({
  providers: [EnvironmentConfig],
  exports: [EnvironmentConfig]
})
export class EnvironmentModule {}
