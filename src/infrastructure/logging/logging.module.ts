import { Module } from '@nestjs/common';
import { LoggingConfig } from './logging.configuration';

@Module({
  providers: [LoggingConfig],
  exports: [LoggingConfig]
})
export class LoggingConfigModule {}
