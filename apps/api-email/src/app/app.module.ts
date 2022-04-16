import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import configuration from './config/configuration';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MailerModule.forRootAsync({
      useFactory: ()=> ({
        transport : {
          service: 'smtp-relay.sendinblue.com',
          port: 587,
          auth: {
            user: 'oigiangbekelvin@gmail.com',
            pass: 'gyFfQMZ7SpRWEL4G',
          }
        },
        defaults: {
          from: '<SoroSoke@app.com>'
        },
        templates: {
          dir: join(__dirname, './templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true
          }
        }

      })
    })
  ],
  controllers: [AppController],
  providers: [EmailService],
})
export class AppModule {}
