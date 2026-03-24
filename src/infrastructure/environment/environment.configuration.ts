import { Injectable } from '@nestjs/common';
import { EnvironmentEnum } from './environment.enum';

@Injectable()
export class EnvironmentConfig {
  private readonly systemEnvs: Array<(string | EnvironmentEnum)>;

  constructor() {
    this.systemEnvs = Object.values(EnvironmentEnum);
  }
}
