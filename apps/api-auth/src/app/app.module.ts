import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '../environments/environment';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserMongooseProvider } from './providers/mongoose.provider';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { GoogleAuthGuard, GoogleStrategy } from '@twitter-clone/core';
import { OAuthService } from './services/oauth.service';
import { OAuthController } from './controllers/oauth.controller';

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
  controllers: [AuthController, OAuthController],
  providers: [AuthService, OAuthService, GoogleStrategy, GoogleAuthGuard],
})
export class AppModule {}
