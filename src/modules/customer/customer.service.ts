import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { GraphCustomerResponse } from './dto/customerGraph.response';

@Injectable()
export class CustomerService {
  constructor(private readonly httpService: HttpService) {}
  private readonly urlGraphMeta = 'https://graph.facebook.com/';

  async getPageCustomerGraph(psid: string, pageAccessToken: string) {
    try {
      const url = `${this.urlGraphMeta}${psid}`;
      const res = await firstValueFrom(
        this.httpService.get<GraphCustomerResponse>(url, {
          params: {
            fields: 'name,profile_pic,locale,timezone,gender',
            access_token: pageAccessToken,
          },
        }),
      );
      return res.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
