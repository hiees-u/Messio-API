import { Injectable } from '@nestjs/common';
import { UseWorkSpaceRepository } from './repositories/useWorkSpace.repository';

@Injectable()
export class WorkSpaceService {
  constructor(
    private readonly useWorkSPaceRepository: UseWorkSpaceRepository,
  ) {}

  async createWorkSpaceWithPageId(pageId: number, userIds: number[]) {
    return await this.useWorkSPaceRepository.createWorkSpaceForPage(
      pageId,
      userIds,
    );
  }
}
