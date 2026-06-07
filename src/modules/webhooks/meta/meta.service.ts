import { Injectable } from '@nestjs/common';
import { UseCustomerRepository } from './repositories/useCustomer.repository';

@Injectable()
export class MetaService {
  constructor(private readonly useCustomer: UseCustomerRepository) {}
  async handlerWebhookMessages(customerId: string) {
    //check existing customer in DB
    const customer = await this.useCustomer.findOrCreateCustomer(customerId);

    console.log(customer);
  }
}
