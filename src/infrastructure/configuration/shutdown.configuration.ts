import { Logger, OnApplicationShutdown } from '@nestjs/common';

export class ShutdownConfig implements OnApplicationShutdown {
  private readonly logger: Logger = new Logger(ShutdownConfig.name);

  onApplicationShutdown(signal?: string) {
    this.logger.warn(`System being shutdown by: ${signal || 'unknown signal'}`);
  }
}
