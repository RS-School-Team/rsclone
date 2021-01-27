import { Body, Controller, Post } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './dto/auth.dto';
import { Payload } from './interface/payload';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() userDTO: LoginDTO) {
    const user = await this.userService.findByLogin(userDTO);
    console.log(user);
    const payload: Payload = {
      password: user.password,
      username: user.username,
    };
    const token = await this.authService.signPayload(payload);

    return { user, token };
  }

  @Post('register')
  async register(@Body() userDTO: RegisterDTO) {
    const user = await this.userService.create(userDTO);
    const payload: Payload = {
      password: user.password,
      username: user.username,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
}
