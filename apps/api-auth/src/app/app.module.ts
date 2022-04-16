import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '../environments/environment.prod';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserMongooseProvider } from './providers/mongoose.provider';
import { rabbitQueues } from '@twitter-clone/core';

@Module({
  imports: [
    MongooseModule.forRoot(environment.Database.DB_URL),
    MongooseModule.forFeatureAsync([UserMongooseProvider]),
    ClientsModule.register([
      {
        name: 'EMAIL_SERVICE',
        transport: Transport.REDIS,
        options: {
          url: 'redis://localhost:6379',
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
