import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
// import { CustomersCreateInput } from 'src/generated/prisma/models';

@Injectable()
export class UseCustomerRepository {
  constructor(private prisma: PrismaService) {}

  async findCustomer(
    psidInput: string,
    // customer?: CustomersCreateInput,
  ) {
    const existingCustomer = await this.prisma.customers.findUnique({
      where: {
        psid: psidInput,
      },
    });

    if (!existingCustomer) {
      // existingCustomer = await this.prisma.customers.create({
      //   data: {
      //     psid: customer?.psid || psidInput,
      //     name: customer?.name || 'Unknown',
      //   },
      // });
    }

    return existingCustomer;
  }
}
