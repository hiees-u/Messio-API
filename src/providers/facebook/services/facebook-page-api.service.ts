import { Injectable } from '@nestjs/common';

import { FacebookGraphClient } from '../clients/facebook-graph.client';

import {
  PageGrapResponse,
  PagesGraphResponse,
} from '../dto/pages.graph.response';
import { PageSubscribedRequest } from '../dto/page-subscribed.response';
@Injectable()
export class FacebookPageApiGraph {
  constructor(private readonly graphClient: FacebookGraphClient) {}

  async getPages(useAccessToke: string): Promise<PageGrapResponse[]> {
    const res = await this.graphClient.get<PagesGraphResponse>('/me/accounts', {
      access_token: useAccessToke,
    });

    return res.data;
  }

  async registerPage(pageId: string, token: string) {
    const res = await this.graphClient.post<PageSubscribedRequest>(
      `/v23.0/${pageId}/subscribed_apps`,
      {},
      {
        subscribed_fields: ['messages'],
        access_token: token,
      },
    );
    return res;
  }
}
