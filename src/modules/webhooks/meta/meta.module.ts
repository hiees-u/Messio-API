import { Module } from '@nestjs/common';
import { MetaController } from './meta.controller';
import { MetaService } from './meta.service';
import { CustomerModule } from 'src/modules/customer/customer.module';
import { UseCustomerRepository } from '../../customer/repositories/useCustomer.repository';
import { PagesModule } from 'src/modules/pages/pages.module';

@Module({
  imports: [CustomerModule, PagesModule],
  controllers: [MetaController],
  providers: [MetaService, UseCustomerRepository],
})
export class MetaModule {}
