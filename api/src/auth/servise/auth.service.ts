import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

import { UsersService } from '../../users/service/users.service';
import { Payload } from '../dto/payload.dto';

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
