import { HttpStatus } from '@nestjs/common';
import { Controller, Get, Header, HttpCode, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../schema/user.schema';
import { UsersService } from '../service/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  getAll(): Promise<User[]> {
    return this.userService.getAllManeger();
  }
}
