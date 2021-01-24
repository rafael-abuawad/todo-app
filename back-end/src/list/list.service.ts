import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ListService {
  constructor(private readonly prisma: PrismaService) {}

  async list(
    authorId: number,
    listWhereUniqueInput: Prisma.ListWhereUniqueInput,
  ) {
    const list = await this.prisma.list.findUnique({
      where: listWhereUniqueInput,
      rejectOnNotFound: true,
    });

    if (list && list.authorId === authorId) {
      return list;
    }
    throw new UnauthorizedException('You are not authorized to get that list');
  }

  async lists(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ListWhereUniqueInput;
    where?: Prisma.ListWhereInput;
    orderBy?: Prisma.ListOrderByInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.list.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createList(data: Prisma.ListCreateInput) {
    return this.prisma.list.create({
      data,
    });
  }

  async updateList(
    authorId: number,
    params: {
      where: Prisma.ListWhereUniqueInput;
      data: Prisma.ListUpdateInput;
    },
  ) {
    const { where, data } = params;
    const list = await this.prisma.list.findUnique({
      where,
      rejectOnNotFound: true,
    });

    if (list && list.authorId === authorId) {
      return this.prisma.list.update({
        data,
        where,
      });
    }
    throw new UnauthorizedException(
      'You are not authorized to update that list',
    );
  }

  async deleteList(authorId: number, where: Prisma.ListWhereUniqueInput) {
    const list = await this.prisma.list.findUnique({
      where,
      rejectOnNotFound: true,
    });

    if (list && list.authorId === authorId) {
      return this.prisma.list.delete({
        where,
      });
    }
    throw new UnauthorizedException(
      'You are not authorized to delete that list',
    );
  }
}
