import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { HttpModule } from '@nestjs/axios';
import { FacebookModulee } from 'src/providers/facebook/facebook.module';
import { UseCustomerRepository } from './repositories/useCustomer.repository';

@Module({
  imports: [HttpModule, FacebookModulee],
  providers: [CustomerService, UseCustomerRepository],
  exports: [CustomerService],
})
export class CustomerModule {}
