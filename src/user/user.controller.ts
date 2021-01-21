import {
  Controller,
  UseGuards,
  Get,
  InternalServerErrorException,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async users() {
    try {
      return await this.userService.users({});
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async user(@Param('id') id: number) {
    try {
      return await this.userService.user({ id });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
