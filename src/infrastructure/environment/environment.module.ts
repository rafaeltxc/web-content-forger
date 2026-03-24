import { Module } from '@nestjs/common';
import { EnvironmentConfig } from './environmentConfig';

@Module({
  providers: [EnvironmentConfig],
  exports: [EnvironmentConfig]
})
export class EnvironmentModule {}
