import { Injectable } from '@nestjs/common';
import { UseCustomerRepository } from './repositories/useCustomer.repository';
import { Response } from 'express';
import { CustomerService } from 'src/modules/customer/customer.service';
import { GraphCustomerResponse } from 'src/modules/customer/dto/customerGraph.response';
import { UsePageRepository } from 'src/modules/pages/repositories/usePage.repository';
// import { CustomerService } from 'src/modules/customer/customer.service';

@Injectable()
export class MetaService {
  constructor(
    private readonly useCustomer: UseCustomerRepository,
    private readonly customerService: CustomerService,
    private readonly usePageRepository: UsePageRepository,
  ) {}

  async handlerWebhookMessages(customerId: string, pageId: string) {
    //check existing customer in DB
    const [customerExisting, pageRecipient] = await Promise.all([
      this.useCustomer.findCustomer(customerId),
      this.usePageRepository.getPageDb(pageId),
    ]);

    if (pageRecipient) {
      if (!customerExisting) {
        //get graph customer
        //create new customer
      }
      //create room DB
    }
    console.log(
      'customer => ',
      customerExisting || 'KHONG CÓ CUSTOMER NÀO',
      pageRecipient,
    );
    /**
     * nếu không có customer => gọi api `curl -X GET "https://graph.facebook.com/<PSID>?fields=first_name,last_name,profile_pic&access_token=<PAGE_ACCESS_TOKEN>"` (`https://developers.facebook.com/documentation/business-messaging/messenger-platform/identity/user-profile`)
     */
    const customer: GraphCustomerResponse | null =
      await this.customerService.getPageCustomerGraph('', '');
    console.log(customer);
  }

  handlerVerificationApiWebhook(
    mode: string,
    token: string,
    challenge: string,
    res: Response,
  ) {
    if (
      mode === 'subscribe' &&
      token === process.env.FACEBOOK_WEBHOOK_VERIFY_TOKEN
    ) {
      return res.status(200).send(challenge);
    }

    return res.status(403).send('Forbidden');
  }
}
