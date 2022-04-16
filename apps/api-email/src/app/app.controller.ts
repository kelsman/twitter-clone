import { Controller, Get } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { EmailConstants } from '@twitter-clone/core';
import { EmailService } from './email.service';

@Controller()
export class AppController {
  constructor(private readonly emailService: EmailService) {}

  @Get()
  getData() {
    return this.emailService.getData();
  }

  @MessagePattern( EmailConstants.EMAIL_VERIFICATION)
  async verify(
    @Payload() data: { email: string; userId: string },
    @Ctx() context: RmqContext
  ) {

    console.log(Payload)
    console.log(`Channel: ${context.getChannel()}`);
    await this.emailService.sendConfirmationEmail(data);
  }
}
