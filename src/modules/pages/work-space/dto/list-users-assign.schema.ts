import { ApiProperty } from '@nestjs/swagger';

export class UsersAssignSchema {
  @ApiProperty({
    type: [Number],
    example: [123, 123],
  })
  userIds!: number[];
}
