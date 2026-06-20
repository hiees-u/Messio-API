import { HttpService } from '@nestjs/axios';
import { BadGatewayException, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FacebookGraphClient {
  constructor(private readonly httpService: HttpService) {}
  private readonly baseUrl = 'https://graph.facebook.com';

  async get<T>(path: string, params?: Record<string, any>): Promise<T> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}${path}`, {
          params: params,
        }),
      );
      return response.data as T;
    } catch (error) {
      console.error(error);
      throw new BadGatewayException('Facebook API error');
    }
  }

  async post<T>(
    path: string,
    param?: Record<string, any>,
    body?: object,
  ): Promise<T> {
    try {
      const res = await firstValueFrom(
        this.httpService.post<T>(`${this.baseUrl}${path}`, body, param),
      );
      return res.data;
    } catch (error) {
      console.error(error);
      throw new BadGatewayException('Facebook API error');
    }
  }
}
