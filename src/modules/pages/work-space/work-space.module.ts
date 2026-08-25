import { Module } from '@nestjs/common';
import { WorkSpaceService } from './work-space.service';
import { UseWorkSpaceRepository } from './repositories/useWorkSpace.repository';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [WorkSpaceService, UseWorkSpaceRepository],
  exports: [WorkSpaceService],
})
export class WorkSpaceModule {}
