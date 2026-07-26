import type { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { MetaService } from './meta.service';
import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';

import { WebsocketService } from 'src/infrastructure/websocket/websocket.service';

import type { WebhooksMessageResponse } from './dto/webhooks.messages.response';
import type { WebhookVerificationRequestDto } from './dto/webhook-verification.request.dto';

@ApiTags('Webhooks')
@Controller('webhooks/meta')
export class MetaController {
  constructor(
    private readonly metaService: MetaService,
    private readonly websocketService: WebsocketService,
  ) {}

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
    return res.sendStatus(200);
  }

  @Post('SendMessage')
  sendMessageToClient() {
    this.websocketService.sendMessageToRoom(
      'room-1033068249897403',
      'Hello from server',
    );
  }
}
