import { Module } from '@nestjs/common';
import { LoggingConfig } from './LoggingConfig';

@Module({
  providers: [LoggingConfig],
  exports: [LoggingConfig]
})
export class LoggingConfigModule {}
