import { MailerService } from '@nestjs-modules/mailer';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// const SibApiV3Sdk = require('sib-api-v3-sdk');
// SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey =
//   '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';

//
// const transporter = nodemailer.createTransport({
//   host: 'smtp-relay.sendinblue.com',
//   port: 587,
//   secure: true,
//   auth: {
//     user: 'oigiangbekelvin@gmail.com',
//     pass: 'gyFfQMZ7SpRWEL4G',
//   },
// });

@Injectable()
export class AppService {
  private logger = new Logger('AppService');

  constructor(
    private configService: ConfigService,
    private mailerService: MailerService
  ) {}

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

    this.mailerService
      .sendMail({
        to: `${payload.email}`,
        from: 'noreply@nestjs.com',
        subject: 'Email Verification from Angular + Nestjs twitter clone',
        template: '/registration.hbs',
        html: `<html><head></head><body><p>Hello,</p>This is my first transactional email sent from twitter clone.</p></body></html>`,
        context: {
          name: 'testing',
          appName: 'Soro soke',
          url: `localhost:4000/api/auth/verify/${payload.userId}`,
        },
      })
      .then((d) => {
        this.logger.log('Email sent', d);
      })
      .catch((error) => {
        this.logger.error(error);
        throw new InternalServerErrorException(
          'Email could not be sent',
          error.message
        );
      });

    // new SibApiV3Sdk.TransactionalEmailsApi()
    //   .sendTransacEmail({
    //     subject: 'Hello from the Node SDK!',
    //     sender: { email: 'api@sendinblue.com', name: 'Sendinblue' },
    //     replyTo: { email: 'api@sendinblue.com', name: 'Sendinblue' },
    //     to: [{ name: 'John Doe', email: `${payload.email}` }],
    //     htmlContent: `<html><body><h1>This is a transactional email </h1></body></html>`,
    //   })
    //   .then(
    //     function (data) {
    //       console.log(data);
    //     },
    //     function (error) {
    //       console.error(error);
    //     }
    //   );
  }
}
