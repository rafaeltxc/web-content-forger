import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { LoggingConfigModule } from './infrastructure/logging/loggingConfig.module';
import { LoggingConfig } from './infrastructure/logging/LoggingConfig';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [LoggingConfigModule],
      inject: [LoggingConfig],
      useFactory: (config: LoggingConfig) => config.getOptions()
    })
  ]
})
export class AppModule {}
