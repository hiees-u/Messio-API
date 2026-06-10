import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
