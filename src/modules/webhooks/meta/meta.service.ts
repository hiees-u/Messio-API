import { ForbiddenException, Injectable } from '@nestjs/common';

import { ChatsService } from 'src/modules/chats/chats.service';

import { WebhookVerificationRequestDto } from './dto/webhook-verification.request.dto';
import { WebhooksMessageResponse } from './dto/webhooks.messages.response';
import { CreateMessageRequestDto } from 'src/modules/chats/messages/dto/create-message.request.dto';

@Injectable()
export class MetaService {
  constructor(private readonly chatsService: ChatsService) {}

  async handlerWebhookMessages(body: WebhooksMessageResponse) {
    console.log('Received webhook:', JSON.stringify(body));
    const psidCusomer = body.entry[0].messaging[0].sender.id;
    const pageId = body.entry[0].messaging[0].recipient.id;
    const messageType =
      body.entry[0].messaging[0].message.attachments?.[0]?.type ?? 'text';
    const message: CreateMessageRequestDto = {
      mid: body.entry[0].messaging[0].message.mid,
      type: messageType,
      text:
        messageType !== 'text' && body.entry[0].messaging[0].message.attachments
          ? body.entry[0].messaging[0].message.attachments[0]?.payload.url
          : body.entry[0].messaging[0].message.text || '',
    };

    await this.chatsService.handlerReceiveMessage(psidCusomer, pageId, message);
  }

  handlerVerificationApiWebhook(query: WebhookVerificationRequestDto) {
    const {
      'hub.mode': mode,
      'hub.verify_token': token,
      'hub.challenge': challenge,
    } = query;

    if (
      mode === 'subscribe' &&
      token === process.env.FACEBOOK_WEBHOOK_VERIFY_TOKEN
    ) {
      return challenge;
    }
    throw new ForbiddenException();
  }
}
