import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';

import { LoggingConfigModule } from './infrastructure/logging/logging.module';
import { LoggingConfig } from './infrastructure/logging/logging.configuration';
import { ConfigurationModule } from './infrastructure/configuration/configuration.module';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      imports: [
        LoggingConfigModule
      ],
      inject: [
        LoggingConfig
      ],
      useFactory: (config: 
        LoggingConfig) => config.getOptions()
    }),

    ConfigurationModule
  ]
})
export class AppModule {}
