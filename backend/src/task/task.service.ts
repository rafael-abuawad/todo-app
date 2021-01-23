import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Task, Prisma } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async task(
    ownerId: number,
    taskWhereUniqueInput: Prisma.TaskWhereUniqueInput,
  ): Promise<Task | null> {
    const task = await this.prisma.task.findUnique({
      where: taskWhereUniqueInput,
      rejectOnNotFound: true,
    });

    if (task) {
      return task;
    }
    throw new UnauthorizedException("You don't have access to that task");
  }

  async tasks(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TaskWhereUniqueInput;
    where?: Prisma.TaskWhereInput;
    orderBy?: Prisma.TaskOrderByInput;
  }): Promise<Task[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.task.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createTask(data: Prisma.TaskCreateInput): Promise<Task> {
    return this.prisma.task.create({
      data,
    });
  }

  async updateTask(
    ownerId: number,
    params: {
      where: Prisma.TaskWhereUniqueInput;
      data: Prisma.TaskUpdateInput;
    },
  ): Promise<Task> {
    const { where, data } = params;
    const task = await this.prisma.task.findUnique({
      where,
      rejectOnNotFound: true,
    });

    if (task) {
      return this.prisma.task.update({
        data,
        where,
      });
    }
    throw new UnauthorizedException("You don't have access to that task");
  }

  async deleteTask(
    ownerId: number,
    where: Prisma.TaskWhereUniqueInput,
  ): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where,
      rejectOnNotFound: true,
    });

    if (task) {
      return this.prisma.task.delete({
        where,
      });
    }
    throw new UnauthorizedException("You don't have access to that task");
  }
}
