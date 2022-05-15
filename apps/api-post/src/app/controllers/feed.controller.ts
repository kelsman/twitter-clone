import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('feed')
@Controller('feed')
export class FeedController {
  constructor() {}

  @Get('user')
  findMany() {}
}
