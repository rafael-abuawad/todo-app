import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [PrismaService, TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
