import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { FacebookUserApiService } from './services/facebook-user-api.service';
import { FacebookGraphClient } from './clients/facebook-graph.client';
import { FacebookPageApiGraph } from './services/facebook-page-api.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [
    FacebookUserApiService,
    FacebookPageApiGraph,
    FacebookGraphClient,
  ],
  exports: [FacebookUserApiService, FacebookPageApiGraph],
})
export class FacebookModulee {}
