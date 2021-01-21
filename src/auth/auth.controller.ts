import {
  Controller,
  UseGuards,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Req,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async profile(@Req() req) {
    try {
      const { userId: id } = req.user;
      return await this.userService.user({ id });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Req() req, @Body() data: { username: string }) {
    try {
      const { userId: id } = req.user;
      return await this.userService.updateUser({
        where: { id },
        data,
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Delete('profile')
  @UseGuards(JwtAuthGuard)
  async deleteProfile(@Req() req) {
    try {
      const { userId: id } = req.user;
      return await this.userService.deleteUser({ id });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Post('signup')
  async signup(@Body() data: { username: string; password: string }) {
    try {
      const user = await this.userService.signup(data);
      return this.authService.login(user);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Post('login')
  async login(@Body() data: { username: string; password: string }) {
    try {
      const user = await this.userService.login(data);
      return this.authService.login(user);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
