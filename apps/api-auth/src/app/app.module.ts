import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '../environments/environment';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserMongooseProvider } from './providers/mongoose.provider';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

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
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
