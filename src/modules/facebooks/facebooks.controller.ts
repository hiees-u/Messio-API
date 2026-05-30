import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FacebooksService } from './facebooks.service';
import { JwtAuthGuard } from 'src/common/auth/guards/jwt-auth.guard';

import type { RequestWithUser } from 'src/common/auth/dto/request-with-user.type';
import type { WebhooksVerificationDto } from './dto/webhooks.verification';
import { RegisterPageDto } from './dto/facebook.pages.grap';

@Controller('facebooks')
export class FacebooksController {
  constructor(private readonly facebooksService: FacebooksService) {}

  @Get('all-pages')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  async getPages(@Req() req: RequestWithUser) {
    return await this.facebooksService.getAllPagesUser(req.user.sub);
  }

  @Get('webhooks')
  getWebhooks(@Query() query: WebhooksVerificationDto, @Res() res: Response) {
    const {
      'hub.mode': mode,
      'hub.verify_token': token,
      'hub.challenge': challenge,
    } = query;

    if (
      mode === 'subscribe' &&
      token === process.env.FACEBOOK_WEBHOOK_VERIFY_TOKEN
    ) {
      return res.status(200).send(challenge);
    }

    return res.status(403).send('Forbidden');
  }

  @Post('webhooks')
  postWebhooks(@Body() body: any, @Res() res: Response) {
    console.log('Received webhook:', JSON.stringify(body));
    res.status(200);
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
      success: [...pagesSuccess],
    };
  }
}
