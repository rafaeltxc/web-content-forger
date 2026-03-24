import { Injectable } from '@nestjs/common';
import { WinstonModuleOptions } from 'nest-winston';
import { Format } from 'logform';
import 'winston-daily-rotate-file';
import * as winston from 'winston';

@Injectable()
export class LoggingConfig {
  private readonly isProd: boolean;

  constructor() {
    this.isProd = process.env.NODE_ENV === 'production';
  }

  public getOptions(): WinstonModuleOptions {
    return {
      level: this.isProd ? 'info' : 'debug',
      format: this.getFormat(),
      transports: [this.getConsoleTransport(), this.getPhysicalTransport()]
    };
  }

  private getFileDir(): string {
    return this.isProd ? '/var/log/content-forger' : './logs';
  }

  private getFormat(): Format {
    return winston.format.combine(
      winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),

      winston.format((info) => {
        info.level = info.level.toUpperCase();
        return info;
      })()
    );
  }

  private getCustomFormat(): Format {
    return winston.format.printf(({ timestamp, level, message, context }) => {
      const contextString = context ? `[${context}] ` : '';

      return `[${timestamp}] ${level.toUpperCase()}: ${contextString}${message}`;
    });
  }

  private getConsoleTransport(): winston.transport {
    return new winston.transports.Console({
      format: winston.format.combine(this.getCustomFormat())
    });
  }

  private getPhysicalTransport() {
    return new winston.transports.DailyRotateFile({
      dirname: this.getFileDir(),
      filename: 'forger.%DATE%.log',
      datePattern: 'DD-MM-YYYY',
      maxSize: '1g',
      maxFiles: '5d',
      format: winston.format.combine(
        winston.format.uncolorize(),
        this.getCustomFormat()
      )
    });
  }
}
