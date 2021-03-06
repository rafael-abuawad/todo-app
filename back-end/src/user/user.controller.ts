import {
  UseGuards,
  Controller,
  Get,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async users() {
    try {
      return await this.userService.users({});
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async user(@Param('id') id: number) {
    try {
      return await this.userService.user({ id });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
