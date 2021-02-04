import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { UsersService } from '../../users/service/users.service';
import { AuthService } from '../servise/auth.service';
import { LoginDTO, RegisterDTO } from '../dto/auth.dto';
import { Payload } from '../dto/payload.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() userDTO: LoginDTO) {
    const user = await this.userService.findByLogin(userDTO);
    const payload: Payload = {
      password: user.password,
      email: user.email,
    };
    const token = await this.authService.signPayload(payload);

    return { user, token };
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() userDTO: RegisterDTO) {
    if (userDTO.email && userDTO.password) {
      try {
        const user = await this.userService.create(userDTO);
        const payload: Payload = {
          password: user.password,
          email: user.email,
        };
        const token = await this.authService.signPayload(payload);
        return { user, token };
      } catch (error) {
        return `User ${userDTO.email} already exist`;
      }
    } else {
      return userDTO.email ? 'need password' : 'need email';
    }
  }
}
