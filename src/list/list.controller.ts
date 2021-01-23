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
import { ListService } from './list.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { Errr} from '@prisma/client'

@Controller('api/lists')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async lists(@Req() req) {
    try {
      const { userId: ownerId } = req.user;
      return await this.listService.lists({
        where: {
          ownerId,
        },
      });
    } catch (err) {
      return new InternalServerErrorException(err);
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createList(@Req() req, @Body() data: { title: string }) {
    try {
      const { userId: ownerId } = req.user;
      return await this.listService.createList({
        title: data.title,
        owner: {
          connect: {
            id: ownerId,
          },
        },
      });
    } catch (err) {
      return new InternalServerErrorException(err);
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async list(@Param('id') id: number, @Req() req) {
    try {
      const { userId: ownerId } = req.user;
      return await this.listService.list(ownerId, { id });
    } catch (err) {
      return new InternalServerErrorException(err);
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateList(
    @Param('id') id: number,
    @Body() data: { title: string },
    @Req() req,
  ) {
    try {
      const { userId: ownerId } = req.user;
      return await this.listService.updateList(ownerId, {
        where: { id },
        data,
      });
    } catch (err) {
      return new InternalServerErrorException(err);
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteList(@Param('id') id: number, @Req() req) {
    try {
      const { userId: ownerId } = req.user;
      return await this.listService.deleteList(ownerId, { id });
    } catch (err) {
      return new InternalServerErrorException(err);
    }
  }
}
