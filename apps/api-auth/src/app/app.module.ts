import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { GoogleAuthGuard, GoogleStrategy } from '@project/core';
import { environment } from '../environments/environment';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './controllers/auth.controller';
import { UserMongooseProvider } from './providers/mongoose.provider';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    MongooseModule.forRoot(environment.Database.DB_URL),
    MongooseModule.forFeatureAsync([UserMongooseProvider]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: <string>environment.JWT_SECRET,
      }),
    }),
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
  controllers: [AuthController, AppController],
  providers: [AuthService, GoogleStrategy, GoogleAuthGuard, AppService],
})
export class AppModule {}
