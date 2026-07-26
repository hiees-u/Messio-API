import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { PagesService } from './pages.service';
import { JwtAuthGuard } from 'src/common/auth/guards/jwt-auth.guard';

import { RegisterPageDto } from 'src/providers/facebook/dto/page-subscribed.request';
import type { RequestWithUser } from 'src/common/auth/dto/request-with-user.type';

@Controller('pages')
export class PagesController {
  constructor(private readonly pageService: PagesService) {}

  @Get('all-pages')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  async getPages(@Req() req: RequestWithUser) {
    return await this.pageService.getAllPagesUser(req.user.sub);
  }

  @Post('page/register')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  async registerPage(
    @Req() req: RequestWithUser,
    @Param() param: RegisterPageDto,
  ) {
    const pagesSuccess = await this.pageService.registerPages(
      req.user.sub,
      param.pageIds,
    );

    if (pagesSuccess.size <= 0) {
      return {
        message: 'Page registered failed',
      };
    }

    return {
      message: 'Page registered successfully',
      pages: [...pagesSuccess],
    };
  }
}
