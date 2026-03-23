import { Injectable } from '@nestjs/common';
import { Params } from 'nestjs-pino';
import fs, { WriteStream } from 'fs';

@Injectable()
export class LoggingConfig {
  public getOptions(): Params {
    return {
      pinoHttp: [
        {
          level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
          transport:
            process.env.NODE_ENV !== 'production'
              ? this.getDevOptions()
              : this.getProdOptions()
        }
      ]
    };
  }

  private getDevOptions(): object {
    const destinationStream: WriteStream =
      fs.createWriteStream('./logs/forger.log');

    return {
      transport: {
        target: 'pino-pretty',
        destination: destinationStream
      }
    };
  }

  private getProdOptions(): object {
    const destinationStream: WriteStream = fs.createWriteStream(
      '/var/log/forger.log'
    );

    return {
      transport: {
        destination: destinationStream
      }
    };
  }
}
