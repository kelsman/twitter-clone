import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreModule, JwtAuthGuard, JwtStrategy } from '@project/core';
import { UserEntity, UserSchema } from '@project/schemas';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    CoreModule,
    MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forFeature([
      {
        name: UserEntity.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, JwtAuthGuard, JwtStrategy],
})
export class AppModule {}
