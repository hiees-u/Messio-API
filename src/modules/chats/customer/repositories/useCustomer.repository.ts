import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { CreateCustomerDto } from '../dto/createCustomer.request.dto';

@Injectable()
export class UseCustomerRepository {
  constructor(private prisma: PrismaService) {}

  async findCustomer(psidInput: string) {
    const existingCustomer = await this.prisma.customers.findUnique({
      where: {
        psid: psidInput,
      },
    });

    if (!existingCustomer) return null;

    return existingCustomer;
  }

  async createCustomer(customerDto: CreateCustomerDto) {
    const customer = await this.prisma.customers.create({
      data: {
        name: customerDto.name,
        psid: customerDto.psid,
      },
    });
    return customer;
  }
}
