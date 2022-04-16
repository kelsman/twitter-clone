import {
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/sendmail-transport';
import { MailerService } from '@nestjs-modules/mailer';

// const transporter = nodemailer.createTransport({
//   host: <string>environment.EMAIL_HOST,
//   port: 587,
//   secure: true,
//   auth: {
//     user: <string>environment.EMAIL_USERNAME,
//     pass: <string>environment.EMAIL_PASSWORD,
//   },
// });
const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '84c310cd433b09',
    pass: 'dfc41467196066',
  },
});

@Injectable()
export class EmailService  {
  private logger = new Logger('EmailService');

  constructor(private  configService: ConfigService, private mailerService:MailerService) {}


  getData(): { message: string } {
    return { message: 'Welcome to api-email!' };
  }

  async sendConfirmationEmail(payload: { email: string; userId: string }) {
    // const options = <MailOptions>{
    //   from: 'Twitter-Clone@example.com',
    //   to: `${payload.email}`,
    //   subject: 'Email Verification',
    //   text: `Please verify your email by clicking on the following link`,
    //   html: `<html><head></head><body><p>Hello,</p>This is my first transactional email sent from twitter clone.</p></body></html>`,
    // };
    // transporter.sendMail(options, (error, info) => {
    //   if (error) {
    //     this.logger.error(error);
    //     throw new InternalServerErrorException(
    //       'Email could not be sent',
    //       error.message
    //     );
    //   } else {
    //     this.logger.log('Email sent: ' + info.response);
    //   }
    // });

    await this.mailerService.sendMail({
      to: payload.email,
      subject: 'Email Verification from Soro soke',
      template: './templates/registration',
      context: {
        name: 'testing',
        appName: 'Soro soke',
        url: `localhost:4000/api/auth/verify/${payload.userId}`,
      }
    })

  }
}
