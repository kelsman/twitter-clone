/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerSetup } from '@twitter-clone/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
    })
  );

  app.enableCors({});
  const port = process.env.PORT || 3333;
  SwaggerSetup(app, {
    title: 'Auth API',
    description: 'The auth API description',
    version: '1.0.0',
    bearerAuth: true,
  });
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
  Logger.log(`Swagger at http://localhost:${port}/docs`);
}

bootstrap();
