import { Controller, Get, Param } from '@nestjs/common';

import { FacebookService } from './facebook.service';
import { User } from '../dto/login-response.dto';

@Controller('facebook')
export class FacebookController {
  constructor(private readonly facebookService: FacebookService) {}

  @Get('login/:code')
  async login(@Param('code') code: string): Promise<User | null> {
    const userInfo = await this.facebookService.login('facebook', code);
    return userInfo;
  }
}
