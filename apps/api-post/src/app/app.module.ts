import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreModule, JwtAuthGuard, JwtStrategy } from '@project/core';
import {
  PostEntity,
  PostSchema,
  UserEntity,
  UserSchema,
} from '@project/schemas';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CoreModule,
    MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forFeature([
      { name: PostEntity.name, schema: PostSchema },
      { name: UserEntity.name, schema: UserSchema },
    ]),
  ],

  controllers: [AppController],
  providers: [AppService, JwtAuthGuard, JwtStrategy],
})
export class AppModule {}
