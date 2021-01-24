import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidateUserDto } from './dto/validate-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      rejectOnNotFound: true,
      select: {
        id: true,
        username: true,
        createdAt: true,
      },
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select: {
        id: true,
        username: true,
        createdAt: true,
      },
    });
  }

  async createUser({ username, password }: CreateUserDto) {
    const saltRounds = 10;
    const salt = genSaltSync(saltRounds);
    const hash = hashSync(password, salt);
    return this.prisma.user.create({
      data: {
        username,
        hash,
      },
      select: {
        id: true,
        username: true,
        createdAt: true,
      },
    });
  }

  async validateUser({ username, password }: ValidateUserDto) {
    try {
      const user = await this.prisma.user.findUnique({ where: { username } });
      if (user && compareSync(password, user.hash)) {
        const { hash, ...data } = user;
        return user;
      }
      throw new UnauthorizedException('Wrong password');
    } catch (err) {
      throw new NotFoundException("User doesn't exists");
    }
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }) {
    const { where, data } = params;

    return this.prisma.user.update({
      data,
      where,
      select: {
        id: true,
        username: true,
        createdAt: true,
      },
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.delete({
      where,
      select: {
        id: true,
        username: true,
        createdAt: true,
      },
    });
  }
}
