import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ name: 'username', required: true })
  username: string;

  @ApiProperty({ name: 'password', required: true })
  password: string;
}
