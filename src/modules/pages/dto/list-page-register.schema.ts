import { ApiProperty } from '@nestjs/swagger';

export class RegisterPagesDto {
  @ApiProperty({
    type: [String],
    example: ['123456789', '987654321'],
  })
  pageIds!: string[];
}
