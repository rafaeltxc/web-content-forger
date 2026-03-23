import { Injectable } from '@nestjs/common';
import pino, { DestinationStream } from 'pino';
import { Params } from 'nestjs-pino';

@Injectable()
export class LoggingConfig {
  public getOptions(): Params {
    const isProd = process.env.NODE_ENV === 'production';

    return {
      pinoHttp: {
        level: isProd ? 'info' : 'debug',
        stream: isProd ? this.getProdDest() : this.getDevDest()
      }
    };
  }

  private getDevDest(): DestinationStream {
    return this.getAsyncDestination('./logs/content-forger.log');
  }

  private getProdDest(): DestinationStream {
    return this.getAsyncDestination(
      '/var/log/content-forger/content-forger.log'
    );
  }

  private getAsyncDestination(dest: string): DestinationStream {
    return pino.destination({
      dest: dest,
      minLength: 2048,
      sync: false
    });
  }
}
