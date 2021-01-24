import { Prisma } from '@prisma/client';

export class ValidateUserDto {
  username: string;
  password: string;
}
