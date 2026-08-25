import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';

import { GoogleService } from './google.service';

import type { ReuqestWithUserGoogle } from 'src/common/auth/dto/request-with-user-google.type';
import type { Response } from 'express';
import { GoogleAuthGuard } from 'src/common/auth/guards/google-auth.guard';

@Controller('auth')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(
    @Req() req: ReuqestWithUserGoogle,
    @Res() res: Response,
  ) {
    await this.googleService.handlerAuthGoogle(req);
    return res.redirect('http://localhost:9090/');
  }
}
