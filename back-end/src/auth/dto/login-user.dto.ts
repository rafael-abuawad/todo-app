import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ name: 'Username', required: true })
  username: string;

  @ApiProperty({ name: 'Password', required: true })
  password: string;
}
