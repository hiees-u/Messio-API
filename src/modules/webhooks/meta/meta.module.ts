import { Module } from '@nestjs/common';
import { MetaController } from './meta.controller';
import { MetaService } from './meta.service';
import { UseCustomerRepository } from '../../chats/customer/repositories/useCustomer.repository';
import { PagesModule } from 'src/modules/pages/pages.module';
import { ChatsModule } from 'src/modules/chats/chats.module';

@Module({
  imports: [PagesModule, ChatsModule],
  controllers: [MetaController],
  providers: [MetaService, UseCustomerRepository],
})
export class MetaModule {}
