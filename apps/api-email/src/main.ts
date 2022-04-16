import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { rabbitQueues } from '@twitter-clone/core';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
        url: 'redis://localhost:6379',
      },
    }
  );

  await app.listen().then(() => {
    Logger.log('Email microservice is listening...');
  });
}

bootstrap();
