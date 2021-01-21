import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { PrismaService } from '../prisma.service';

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
      },
    });
  }

  async signup(data: { username: string; password: string }) {
    // Here we are only hashing the password and
    // passing it to the create method
    const saltRounds = 10;
    const salt = genSaltSync(saltRounds);
    const hash = hashSync(data.password, salt);
    return this.prisma.user.create({
      data: {
        username: data.username.trim().toLowerCase(),
        hash,
      },
      select: {
        id: true,
        username: true,
      },
    });
  }

  async login(data: { username: string; password: string }) {
    try {
      // We first find the user, if there not one
      // we'll throw an error
      const user = await this.prisma.user.findUnique({
        where: {
          username: data.username.trim().toLowerCase(),
        },
        rejectOnNotFound: true,
      });
      // Now we compare the password with the hash
      const match = compareSync(data.password, user.hash);
      if (match) {
        // If they matched we return the user without the hash
        const { hash, ...userData } = user;
        return userData;
      } else {
        // If they don't match we throw an error
        throw new InternalServerErrorException('Wrong username or password');
      }
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }) {
    const { where, data } = params;
    const user = await this.prisma.user.findUnique({
      where: {
        username: <string>data.username,
      },
    });

    if (!user) {
      return this.prisma.user.update({
        data: {
          username: data.username,
        },
        where,
      });
    }
    throw new InternalServerErrorException('Username already taken');
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.delete({
      where,
    });
  }
}
