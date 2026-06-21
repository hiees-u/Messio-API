import { Controller, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login/:code')
  async login(
    @Param('code') code: string,
  ): Promise<{ accessToken: string } | null> {
    const userInfo = await this.authService.login(code);
    return userInfo;
  }
}
