import { NestFactory } from '@nestjs/core';
import { PORT } from 'src/shared/constants/env';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { urlencoded, json } from 'express';
var busboy = require('connect-busboy');

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule.initialize(), {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  app.use(cookieParser());
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.use(busboy());
  await app.listen(PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
