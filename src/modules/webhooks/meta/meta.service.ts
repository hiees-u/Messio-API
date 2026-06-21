import { ForbiddenException, Injectable } from '@nestjs/common';
import { CustomerService } from 'src/modules/customer/customer.service';
import { UsePageRepository } from 'src/modules/pages/repositories/usePage.repository';
import { WebhookVerificationRequestDto } from './dto/webhook-verification.request.dto';
import { WebhooksMessageResponse } from './dto/webhooks.messages.response';
import { CustomerDto } from 'src/modules/customer/dto/customer.dto';

@Injectable()
export class MetaService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly usePageRepository: UsePageRepository,
  ) {}

  async handlerWebhookMessages(body: WebhooksMessageResponse) {
    console.log('Received webhook:', JSON.stringify(body));
    const psidCusomer = body.entry[0].messaging[0].sender.id;
    const pageId = body.entry[0].messaging[0].recipient.id;

    //check existing customer in DB
    const pageRecipient = await this.usePageRepository.getPageDb(pageId);
    /**
     * nếu không có customer => gọi api `curl -X GET "https://graph.facebook.com/<PSID>?fields=first_name,last_name,profile_pic&access_token=<PAGE_ACCESS_TOKEN>"` (`https://developers.facebook.com/documentation/business-messaging/messenger-platform/identity/user-profile`)
     */
    const customer: CustomerDto | null =
      await this.customerService.findOrCreatePageCustomer(
        psidCusomer,
        pageRecipient?.token || null,
      );
    console.log(customer);
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
