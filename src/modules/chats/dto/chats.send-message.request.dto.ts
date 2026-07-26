import { ApiProperty } from '@nestjs/swagger';

export class SendMessagesRequest {
  @ApiProperty({
    example: 123,
    description: 'Message ID',
  })
  id!: number;
}
