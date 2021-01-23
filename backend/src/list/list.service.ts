import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { List, Prisma } from '@prisma/client';

@Injectable()
export class ListService {
  constructor(private readonly prisma: PrismaService) {}

  async list(
    ownerId: number,
    listWhereUniqueInput: Prisma.ListWhereUniqueInput,
  ): Promise<List | null> {
    const list = await this.prisma.list.findUnique({
      where: listWhereUniqueInput,
      rejectOnNotFound: true,
    });

    if (list) {
      return list;
    }
    throw new UnauthorizedException("You don't have access to that list");
  }

  async lists(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ListWhereUniqueInput;
    where?: Prisma.ListWhereInput;
    orderBy?: Prisma.ListOrderByInput;
  }): Promise<List[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.list.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createList(data: Prisma.ListCreateInput): Promise<List> {
    return this.prisma.list.create({
      data,
    });
  }

  async updateList(
    ownerId: number,
    params: {
      where: Prisma.ListWhereUniqueInput;
      data: Prisma.ListUpdateInput;
    },
  ): Promise<List> {
    const { where, data } = params;
    const list = await this.prisma.list.findUnique({
      where,
      rejectOnNotFound: true,
    });

    if (list) {
      return this.prisma.list.update({
        data,
        where,
      });
    }
    throw new UnauthorizedException("You don't have access to that list");
  }

  async deleteList(
    ownerId: number,
    where: Prisma.ListWhereUniqueInput,
  ): Promise<List> {
    const list = await this.prisma.list.findUnique({
      where,
      rejectOnNotFound: true,
    });

    if (list) {
      return this.prisma.list.delete({
        where,
      });
    }
    throw new UnauthorizedException("You don't have access to that list");
  }
}
