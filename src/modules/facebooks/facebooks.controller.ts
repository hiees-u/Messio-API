import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FacebooksService } from './facebooks.service';
import { JwtAuthGuard } from 'src/common/auth/guards/jwt-auth.guard';

import { RegisterPageDto } from './dto/pages.graph.dto';
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

  @Post('page/register')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  async registerPage(
    @Req() req: RequestWithUser,
    @Body() body: RegisterPageDto,
  ) {
    const pagesSuccess = await this.facebooksService.registerPages(
      req.user.sub,
      body.pageIds,
    );
    return {
      message: 'Page registered successfully',
      pages: [...pagesSuccess],
    };
  }
}
