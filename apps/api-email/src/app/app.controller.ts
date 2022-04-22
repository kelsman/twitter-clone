import { Controller, Get } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RedisSubject } from '@project/core';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly emailService: AppService) {}

  @Get()
  getData() {
    return this.emailService.getData();
  }

  @EventPattern(RedisSubject.CONFIRM_EMAIL_SUBJECT)
  async verify(
    @Payload() payload: { email: string; userId: string },
    @Ctx() context: RmqContext
  ) {
    await this.emailService.sendConfirmationEmail(payload);
  }
}
