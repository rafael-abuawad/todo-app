import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ name: 'Username', required: false })
  username: string;
}
