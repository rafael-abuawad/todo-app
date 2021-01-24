import {
  UseGuards,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Request,
  InternalServerErrorException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@ApiBearerAuth()
@ApiTags('Tasks')
@Controller('api/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async tasks(@Request() req) {
    try {
      return await this.taskService.tasks({
        where: { authorId: req.user.userId },
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async task(@Param('id') id: number, @Request() req) {
    try {
      return await this.taskService.task(req.user.userid, { id });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createTask(@Request() req, @Body() data: CreateTaskDto) {
    try {
      return await this.taskService.createTask({
        title: data.title,
        description: data.description,
        list: {
          connect: {
            id: data.list,
          },
        },
        author: {
          connect: {
            id: req.user.userId,
          },
        },
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateTask(
    @Param('id') id: number,
    @Request() req,
    @Body() data: UpdateTaskDto,
  ) {
    try {
      return await this.taskService.updateTask(req.user.userid, {
        where: { id },
        data: {
          title: data.title,
          description: data.description,
          updatedAt: new Date(),
        },
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteTask(@Param('id') id: number, @Request() req) {
    try {
      return await this.taskService.deleteTask(req.user.userid, { id });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
