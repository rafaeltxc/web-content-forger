import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';

import { LoggingConfigModule } from './infrastructure/logging/logging.module';
import { LoggingConfig } from './infrastructure/logging/LoggingConfig';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      imports: [LoggingConfigModule],
      inject: [LoggingConfig],
      useFactory: (config: LoggingConfig) => config.getOptions()
    })
  ]
})
export class AppModule {}
