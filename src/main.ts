import { NestFactory } from '@nestjs/core';
import { AppModule } from './main.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

const createApp = async () =>
  NestFactory.create(AppModule, { bufferLogs: true }).then((app) => {
    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
    app.enableShutdownHooks();

    return app;
  });

createApp().then((app) =>
  app.listen(process.env.PORT ?? 3000));
