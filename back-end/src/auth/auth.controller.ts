import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';
import { UserService } from '../user/user.service';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() data: LoginUserDto) {
    try {
      return this.authService.login(data);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Post('signup')
  async signup(@Body() data: SignupUserDto) {
    try {
      const user = await this.userService.createUser(data);
      return this.authService.login(data);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
