import { Prisma } from '@prisma/client';

export class CreateUserDto {
  username: string;
  password: string;
}
