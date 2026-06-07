import { Module } from '@nestjs/common';
import { MetaController } from './meta.controller';
import { MetaService } from './meta.service';
import { UseCustomerRepository } from './repositories/useCustomer.repository';

@Module({
  imports: [],
  controllers: [MetaController],
  providers: [MetaService, UseCustomerRepository],
})
export class MetaModule {}
