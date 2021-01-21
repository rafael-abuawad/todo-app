import { Controller, Get, InternalServerErrorException, Param } from '@nestjs/common';
import { UserService } from './user.service'

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async users() {
    try {
      return await this.userService.users({})
    } catch(err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Get(':id')
  async user(@Param('id') id: number) {
    try {
      return await this.userService.user({ id })
    } catch(err) {
      throw new InternalServerErrorException(err);
    }
  }
}
