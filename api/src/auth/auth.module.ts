import { Module } from '@nestjs/common';
import { AuthService } from './servise/auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './guards/jwt.strategy';
import { AuthController } from './controller/auth.controller';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
