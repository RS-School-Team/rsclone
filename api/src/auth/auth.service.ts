import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

import { UsersService } from '../users/users.service';
import { Payload } from './interface/payload';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signPayload(payload: Payload) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '12h' });
  }

  async validateUser(payload: Payload) {
    return await this.usersService.findByPayload(payload);
  }
}
