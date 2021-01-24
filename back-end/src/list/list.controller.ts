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
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@ApiBearerAuth()
@ApiTags('Lists')
@Controller('api/lists')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async lists(@Request() req) {
    try {
      return await this.listService.lists({
        where: { authorId: req.user.userId },
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async list(@Param('id') id: number, @Request() req) {
    try {
      return await this.listService.list(req.user.userid, { id });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createList(@Request() req, @Body() data: CreateListDto) {
    try {
      return await this.listService.createList({
        title: data.title,
        description: data.description,
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
  async updateList(
    @Param('id') id: number,
    @Request() req,
    @Body() data: UpdateListDto,
  ) {
    try {
      return await this.listService.updateList(req.user.userid, {
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
  async deleteList(@Param('id') id: number, @Request() req) {
    try {
      return await this.listService.deleteList(req.user.userid, { id });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
