import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreModule, JwtAuthGuard, JwtStrategy } from '@project/core';
import {
  CommentModel,
  CommentSchema,
  PostEntity,
  PostSchema,
  UserEntity,
  UserSchema,
} from '@project/schemas';
import { AppController } from './controllers/app.controller';
import { CommentController } from './controllers/comment.controller';
import { FeedController } from './controllers/feed.controller';
import { FeedGateway } from './gateways/feed.gateway';
import { AppService } from './services/app.service';
import { CommentService } from './services/comment.service';

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
      { name: CommentModel.name, schema: CommentSchema },
    ]),
  ],

  controllers: [AppController, FeedController, CommentController],
  providers: [
    FeedGateway,
    AppService,
    JwtAuthGuard,
    JwtStrategy,
    CommentService,
  ],
})
export class AppModule {}
