import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async task(
    authorId: number,
    taskWhereUniqueInput: Prisma.TaskWhereUniqueInput,
  ) {
    const task = await this.prisma.task.findUnique({
      where: taskWhereUniqueInput,
      rejectOnNotFound: true,
    });

    if (task && task.authorId === authorId) {
      return task;
    }
    throw new UnauthorizedException('You are not authorized to get that task');
  }

  async tasks(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TaskWhereUniqueInput;
    where?: Prisma.TaskWhereInput;
    orderBy?: Prisma.TaskOrderByInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.task.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createTask(data: Prisma.TaskCreateInput) {
    return this.prisma.task.create({
      data,
    });
  }

  async updateTask(
    authorId: number,
    params: {
      where: Prisma.TaskWhereUniqueInput;
      data: Prisma.TaskUpdateInput;
    },
  ) {
    const { where, data } = params;
    const task = await this.prisma.task.findUnique({
      where,
      rejectOnNotFound: true,
    });

    if (task && task.authorId === authorId) {
      return this.prisma.task.update({
        data,
        where,
      });
    }
    throw new UnauthorizedException(
      'You are not authorized to update that task',
    );
  }

  async deleteTask(authorId: number, where: Prisma.TaskWhereUniqueInput) {
    const task = await this.prisma.task.findUnique({
      where,
      rejectOnNotFound: true,
    });

    if (task && task.authorId === authorId) {
      return this.prisma.task.delete({
        where,
      });
    }
    throw new UnauthorizedException(
      'You are not authorized to delete that task',
    );
  }
}
