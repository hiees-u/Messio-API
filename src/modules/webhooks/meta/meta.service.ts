import { ForbiddenException, Injectable } from '@nestjs/common';
// import { CustomerService } from 'src/modules/chats/customer/customer.service';
// import { UsePageRepository } from 'src/modules/pages/repositories/usePage.repository';
import { WebhookVerificationRequestDto } from './dto/webhook-verification.request.dto';
import { WebhooksMessageResponse } from './dto/webhooks.messages.response';
import { ChatsService } from 'src/modules/chats/chats.service';
import { CreateMessageRequestDto } from 'src/modules/chats/messages/dto/create-message.request.dto';
// import { CustomerDto } from 'src/modules/chats/customer/dto/customer.dto';

@Injectable()
export class MetaService {
  constructor(
    private readonly chatsService: ChatsService,
    // private readonly usePageRepository: UsePageRepository,
  ) {}

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

    //check existing customer in DB
    // const pageRecipient = await this.usePageRepository.getPageDb(pageId);
    /**
     * nếu không có customer => gọi api `curl -X GET "https://graph.facebook.com/<PSID>?fields=first_name,last_name,profile_pic&access_token=<PAGE_ACCESS_TOKEN>"` (`https://developers.facebook.com/documentation/business-messaging/messenger-platform/identity/user-profile`)
     */
    // const customer: CustomerDto | null =
    //   await this.customerService.findOrCreatePageCustomer(
    //     psidCusomer,
    //     pageRecipient?.token || null,
    //   );
    // console.log(customer);
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
