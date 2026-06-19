import { Injectable } from '@nestjs/common';

import { FacebookGraphClient } from '../clients/facebook-graph.client';

import {
  PageGrapResponse,
  PagesGraphResponse,
} from '../dto/pages.graph.response';
import { PageSubscribedRequest } from '../dto/pageSubscribed.request';
import { PagesDto } from '../dto/page.dto';

@Injectable()
export class FacebookPageApiGraph {
  constructor(private readonly graphClient: FacebookGraphClient) {}

  async getPages(useAccessToke: string) {
    const res = await this.graphClient.get<PagesGraphResponse>('/me/accounts', {
      access_token: useAccessToke,
    });

    const pages: PagesDto[] = res.data.map((page: PageGrapResponse) => {
      return {
        id: page.id,
        token: page.access_token,
        name: page.name,
        tasks: page.tasks,
        registered: false,
      };
    });

    return pages;
  }

  async registerPage(pageId: string, token: string) {
    const res = await this.graphClient.post<PageSubscribedRequest>(
      `/v23.0/${pageId}/subscribed_apps`,
      {},
      {
        params: {
          subscribed_fields: ['messages'],
          access_token: token,
        },
      },
    );
    return res;
  }
}
