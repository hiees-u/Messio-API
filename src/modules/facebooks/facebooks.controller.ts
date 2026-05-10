import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { FacebooksService } from './facebooks.service';
import { JwtAuthGuard } from 'src/common/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

import type { RequestWithUser } from 'src/common/auth/dto/request-with-user.type';

@Controller('facebooks')
export class FacebooksController {
  constructor(private readonly facebooksService: FacebooksService) {}

  @Get('all-pages')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  async getPages(@Req() req: RequestWithUser) {
    return await this.facebooksService.getAllPagesUser(req.user.sub);
  }
}
