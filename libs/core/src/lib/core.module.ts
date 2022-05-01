import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './guards';
import { FileService } from './services/file.service';
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
  providers: [JwtAuthGuard, JwtStrategy, FileService],
  exports: [JwtAuthGuard, JwtStrategy, FileService],
})
export class CoreModule {}
