import { Injectable } from '@nestjs/common';

import { FacebookGraphClient } from '../clients/facebook-graph.client';

import type { GraphCustomerResponse } from 'src/modules/chats/customer/dto/customerGraph.response.dto';

@Injectable()
export class CustomerApiGraph {
  constructor(private readonly graphClient: FacebookGraphClient) {}

  async getPageCustomer(
    psid: string,
    pageAccessToken: string,
  ): Promise<GraphCustomerResponse> {
    const customer = await this.graphClient.get<GraphCustomerResponse>(
      `/${psid}`,
      {
        fields: 'name,profile_pic,locale,timezone,gender',
        access_token: pageAccessToken,
      },
    );

    return customer;
  }
}
