import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async tasks(@Req() req) {
    try {
      const { userId: ownerId } = req.user;
      return await this.taskService.tasks({
        where: {
          ownerId,
        },
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createPost(
    @Req() req,
    @Body() data: { title: string; description: string; list: number },
  ) {
    try {
      const { userId: ownerId } = req.user;
      return await this.taskService.createTask({
        title: data.title,
        description: data.description,
        owner: {
          connect: {
            id: ownerId,
          },
        },
        list: {
          connect: {
            id: data.list,
          },
        },
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async task(@Param('id') id: number, @Req() req) {
    try {
      const { userId: ownerId } = req.user;
      return await this.taskService.task(ownerId, { id });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateTask(
    @Param('id') id: number,
    @Body() data: { title: string; description: string },
    @Req() req,
  ) {
    try {
      const { userId: ownerId } = req.user;
      return await this.taskService.updateTask(ownerId, {
        where: { id },
        data,
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteTask(@Param('id') id: number, @Req() req) {
    try {
      const { userId: ownerId } = req.user;
      return await this.taskService.deleteTask(ownerId, { id });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
