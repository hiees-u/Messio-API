import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { MetaService } from './meta.service';

import type { WebhookVerificationRequestDto } from './dto/webhook-verification.request.dto';
import type { Response } from 'express';
import type { WebhooksMessageResponse } from './dto/webhooks.messages.response';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Webhooks')
@Controller('webhooks/meta')
export class MetaController {
  constructor(private readonly metaService: MetaService) {}

  @Get()
  getMetaWebhooks(
    @Query() query: WebhookVerificationRequestDto,
    @Res() res: Response,
  ) {
    const result = this.metaService.handlerVerificationApiWebhook(query);

    return res.status(200).send(result);
  }

  @Post()
  async postWebhooks(
    @Body() body: WebhooksMessageResponse,
    @Res() res: Response,
  ) {
    await this.metaService.handlerWebhookMessages(body);
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
    // void this.facebooksService.handlerMessagesWebhook(
    //   body.entry[0].messaging[0].sender.id,
    //   body.entry[0].id,
    // );
    return res.sendStatus(200);
  }
}
