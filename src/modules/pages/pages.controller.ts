import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { PagesService } from './pages.service';
import { JwtAuthGuard } from 'src/common/auth/guards/jwt-auth.guard';
import { Permission } from 'src/common/auth/decorators/permisions.decorator';
import { PermissionGuard } from 'src/common/auth/guards/permission.guard';

import type { RequestWithUser } from 'src/common/auth/dto/request-with-user.type';
import { RegisterPagesDto } from './dto/list-page-register.schema';
import { UsersAssignSchema } from './work-space/dto/list-users-assign.schema';
// import { PageIdAssignSchena } from './work-space/dto/page-id-assign.schema';

@Controller('pages')
export class PagesController {
  constructor(private readonly pageService: PagesService) {}

  @Get('all-pages')
  @ApiBearerAuth('JWT')
  @Permission('admin')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  async getPages(@Req() req: RequestWithUser) {
    return await this.pageService.getAllPagesUser(req.user.sub);
  }

  @Post('page/register')
  @ApiBearerAuth('JWT')
  @Permission('admin')
  @UseGuards(JwtAuthGuard)
  async registerPage(
    @Req() req: RequestWithUser,
    @Body() body: RegisterPagesDto,
  ) {
    const pagesSuccess = await this.pageService.registerPages(
      req.user.sub,
      body.pageIds,
    );

    if (!pagesSuccess || pagesSuccess.length <= 0) {
      return {
        message: 'Page registered failed',
      };
    }

    return {
      message: 'Page registered successfully',
      pages: [...pagesSuccess],
    };
  }

  @Post('page/:id/assign')
  @ApiBearerAuth('JWT')
  @Permission('admin')
  @UseGuards(JwtAuthGuard)
  pageAssign(
    @Param('id', ParseIntPipe) pageId: number,
    @Body() userSchemas: UsersAssignSchema,
  ) {
    //verify user request có quyền handler pageId
    return this.pageService.createWorkSpace(pageId, userSchemas.userIds);
  }
}
