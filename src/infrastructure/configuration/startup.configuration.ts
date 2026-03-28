import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EnvironmentConfig } from '../environment/environment.configuration';

@Injectable()
export class StartupConfig implements OnModuleInit {
  private readonly logger: Logger = new Logger(StartupConfig.name);

  private readonly envConfig: EnvironmentConfig;

  constructor(
    @Inject() envConfig: EnvironmentConfig
  ) {
    this.envConfig = envConfig;
  }

  public onModuleInit() {
    try {
      this.logger.log(
        "Applying initial system pipeline.");
      this.executeStartupPipeline();
    } catch(err: unknown) {
      this.logger.error(
        `System startup will be stopped shortly. ${err}`);
      process.kill(process.pid, 'SIGTERM');
    }
  }

  private executeStartupPipeline() {
    try {
      this.logger.log(
        "Applying environment variables sanity check.");
      this.envConfig.applySanityCheck();
    } catch (err: unknown) {
      this.logger.error("An error was " +
        "found executing initilization pipeline.");
      throw err;
    }
  }
}
