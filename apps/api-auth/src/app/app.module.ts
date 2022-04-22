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
import { OAuthController } from './controllers/oauth.controller';
import {
  googleUserProvider,
  UserMongooseProvider,
} from './providers/mongoose.provider';
import { AuthService } from './services/auth.service';
import { OAuthService } from './services/oauth.service';

@Module({
  imports: [
    MongooseModule.forRoot(environment.Database.DB_URL),
    MongooseModule.forFeatureAsync([UserMongooseProvider, googleUserProvider]),
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
  controllers: [AuthController, OAuthController, AppController],
  providers: [
    AuthService,
    OAuthService,
    GoogleStrategy,
    GoogleAuthGuard,
    AppService,
  ],
})
export class AppModule {}
