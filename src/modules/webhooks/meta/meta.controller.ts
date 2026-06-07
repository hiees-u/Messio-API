import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { MetaService } from './meta.service';

import type { WebhooksVerificationDto } from './dto/webhooks.verification';
import type { Response } from 'express';
import type { WebhooksMessageResponse } from './dto/webhooks.messages.response';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Webhooks')
@Controller('webhooks/meta')
export class MetaController {
  constructor(private readonly metaService: MetaService) {}

  @Get()
  getMetaWebhooks(
    @Query() query: WebhooksVerificationDto,
    @Res() res: Response,
  ) {
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

  @Post()
  async postWebhooks(
    @Body() body: WebhooksMessageResponse,
    @Res() res: Response,
  ) {
    console.log('Received webhook:', JSON.stringify(body));
    const customerId = body.entry[0].messaging[0].sender.id;
    await this.metaService.handlerWebhookMessages(customerId);
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
