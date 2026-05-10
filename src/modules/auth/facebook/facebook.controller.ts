import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';

import { FacebookService } from './facebook.service';
import { LoginResponseDto } from '../../dto/login-response.dto';
import { JwtAuthGuard } from 'src/common/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import type { RequestWithUser } from 'src/common/auth/dto/request-with-user.type';

@Controller('facebook')
export class FacebookController {
  constructor(private readonly facebookService: FacebookService) {}

  @Get('login/:code')
  async login(@Param('code') code: string): Promise<LoginResponseDto | null> {
    const userInfo = await this.facebookService.login(code);
    return userInfo;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @Get('profile')
  getProfile(@Req() req: RequestWithUser) {
    return req.user;
  }
}
