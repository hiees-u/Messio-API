import { Injectable } from '@nestjs/common';
import UseRoomRepository from './repositories/useRoom.repository';

@Injectable()
export class RoomsService {
  constructor(private readonly useRoomRepository: UseRoomRepository) {}

  async getRoomDb(pageId: number, customerId: number) {
    return await this.useRoomRepository.getRoom(pageId, customerId);
  }

  async createRoomDb(pageId: number, customerId: number) {
    return await this.useRoomRepository.createRoom(pageId, customerId);
  }
}
