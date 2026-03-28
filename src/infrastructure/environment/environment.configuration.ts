import { Injectable } from '@nestjs/common';
import { EnvironmentEnum } from './environment.enum';
import { EnvNotFound } from 'src/error/envNotFound.exception';

@Injectable()
export class EnvironmentConfig {
  private readonly systemEnvs: Array<EnvironmentEnum>;

  constructor() {
    this.systemEnvs = Object.values(EnvironmentEnum);
  }

  public getEnv(env: EnvironmentEnum): string | undefined {
    return process.env[env];
  }

  public applySanityCheck(): void {
    const missingEnvs = this.systemEnvs.filter((env) => !this.getEnv(env));

    if (missingEnvs.length > 0) {
      throw new EnvNotFound(`An error was caught validating 
        environment variables. Missing envs: ${missingEnvs.join(', ')}`);
    }
  }
}
