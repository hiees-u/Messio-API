import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import UseRoomRepository from './repositories/useRoom.repository';

@Module({
  providers: [RoomsService, UseRoomRepository],
  exports: [RoomsService],
})
export class RoomsModule {}
