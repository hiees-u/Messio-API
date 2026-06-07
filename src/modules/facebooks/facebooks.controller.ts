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

import { RegisterPageDto } from './dto/pages.graph.dto';
import type { RequestWithUser } from 'src/common/auth/dto/request-with-user.type';
import type { WebhooksVerificationDto } from './dto/webhooks.verification';
import type { WebhooksMessageResponse } from './dto/webhooks.messages.response';

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
  postWebhooks(@Body() body: WebhooksMessageResponse, @Res() res: Response) {
    console.log('Received webhook:', JSON.stringify(body));
    /**
     * - anylize body
     * --- body.messaging.sender.id find | create DB Customer
     * --- body.entry.id find DB page
     * --- find | create room with page and customer
     * --- create message with room
     *
     *
     * - find FacebookPage  |
     *                      |-> find | create Room -> create Messages -> check user registed room --[có]-> emit message to room
     * - find Customer      |                                                                     --[không]-> send email
     */
    void this.facebooksService.handlerMessagesWebhook(
      body.entry[0].messaging[0].sender.id,
      body.entry[0].id,
    );
    return res.sendStatus(200);
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
