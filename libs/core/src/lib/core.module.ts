import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './guards';
import { ParseObjectIdPipe } from './pipes';
import { FileService } from './services';
import { JwtStrategy } from './strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [],
  providers: [JwtAuthGuard, JwtStrategy, FileService, ParseObjectIdPipe],
  exports: [JwtAuthGuard, JwtStrategy, FileService, ParseObjectIdPipe],
})
export class CoreModule {}
