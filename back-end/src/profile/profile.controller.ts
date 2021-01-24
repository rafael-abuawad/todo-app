import {
  UseGuards,
  Controller,
  Get,
  Put,
  Delete,
  Request,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserService } from '../user/user.service';
import { UpdateUserDto } from '../user/dto/update-user.dto';

@ApiBearerAuth()
@ApiTags('Profile')
@Controller('api/profile')
export class ProfileController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async profile(@Request() req) {
    try {
      return await this.userService.user({ id: req.user.userId });
    } catch (err) {
      throw new InternalServerErrorException("Profile wasn't found");
    }
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Request() req, @Body() data: UpdateUserDto) {
    try {
      return await this.userService.updateUser({
        where: { id: req.user.userId },
        data,
      });
    } catch (err) {
      throw new InternalServerErrorException("Profile wasn't found");
    }
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteProfile(@Request() req) {
    try {
      return await this.userService.deleteUser({ id: req.user.userId });
    } catch (err) {
      throw new InternalServerErrorException("Profile wasn't found");
    }
  }
}
