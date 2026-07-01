import { Module } from '@nestjs/common';
import { MetaModule } from './meta/meta.module';

@Module({
  imports: [MetaModule],
  exports: [MetaModule],
})
export class WebhooksModule {}
