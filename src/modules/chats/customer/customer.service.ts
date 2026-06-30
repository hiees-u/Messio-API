import { Injectable } from '@nestjs/common';

import { GraphCustomerResponse } from './dto/customerGraph.response.dto';
import { CustomerDto } from './dto/customer.dto';
import { UseCustomerRepository } from './repositories/useCustomer.repository';
import { CustomerApiGraph } from 'src/providers/facebook/services/customer-api.service';
import { FindOrCreateResult } from 'src/common/types/find-or-create-result.type';

@Injectable()
export class CustomerService {
  constructor(
    private readonly useCustomerRepository: UseCustomerRepository,
    private readonly customerApiGraph: CustomerApiGraph,
  ) {}

  async findOrCreatePageCustomer(
    psid: string,
    pageAccessToken: string | null = null,
  ): Promise<FindOrCreateResult<CustomerDto | null>> {
    let existingCustomer: CustomerDto | null =
      (await this.useCustomerRepository.findCustomer(psid)) || null;

    if (existingCustomer) {
      return {
        data: existingCustomer,
        created: false,
      };
    }

    if (pageAccessToken) {
      const cusomer: GraphCustomerResponse =
        await this.customerApiGraph.getPageCustomer(psid, pageAccessToken);

      if (cusomer) {
        existingCustomer = await this.useCustomerRepository.createCustomer({
          psid: cusomer.id,
          name: cusomer.name || cusomer?.first_name + ' ' + cusomer?.last_name,
        });
      }
    }

    return {
      data: existingCustomer,
      created: true,
    };
  }
}
