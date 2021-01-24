import { Controller, Get, Param, BadRequestException } from '@nestjs/common';
import {
  ApiHeader,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiHeader({
  name: 'Users',
})
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({ description: 'The records has been successfully founded.' })
  @ApiUnauthorizedResponse({ description: 'Forbidden.' })
  @ApiBadRequestResponse({
    description: 'Something went wrong while querying the Database.',
  })
  async users() {
    try {
      return await this.userService.users({});
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  @Get(':id')
  @ApiOkResponse({ description: 'The record has been successfully founded.' })
  @ApiUnauthorizedResponse({ description: 'Forbidden.' })
  @ApiBadRequestResponse({
    description: 'Something went wrong while querying the Database.',
  })
  async user(@Param('id') id: number) {
    try {
      return await this.userService.user({ id });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
