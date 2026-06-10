import { Module } from '@nestjs/common';
import { MetaController } from './meta.controller';
import { MetaService } from './meta.service';
import { CustomerModule } from 'src/modules/customer/customer.module';
import { UseCustomerRepository } from './repositories/useCustomer.repository';
import { FacebooksModule } from 'src/modules/facebooks/facebooks.module';

@Module({
  imports: [CustomerModule, FacebooksModule],
  controllers: [MetaController],
  providers: [MetaService, UseCustomerRepository],
})
export class MetaModule {}
