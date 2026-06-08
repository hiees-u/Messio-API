import { Injectable } from '@nestjs/common';
import { UseCustomerRepository } from './repositories/useCustomer.repository';
import { Response } from 'express';

@Injectable()
export class MetaService {
  constructor(private readonly useCustomer: UseCustomerRepository) {}
  async handlerWebhookMessages(customerId: string) {
    //check existing customer in DB
    const customer = await this.useCustomer.findCustomer(customerId);

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
