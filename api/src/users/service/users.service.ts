import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { CreateUserDto } from '../schema/create-user.dto';
import { User, UserDocument } from '../schema/user.schema';
import { UpdateUserDto } from '../schema/update-user.dto';
import { Payload } from '../../auth/dto/payload.dto';
import { LoginDTO } from '../../auth/dto/auth.dto';
import { ProjectService } from 'src/project/service/project.service';

@Injectable()
export class UsersService {
  constructor(
    private projectService: ProjectService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  async getAllManeger(): Promise<User[]> {
    return this.userModel
      .find({ manager: true })
      .select('email manager created name');
  }

  async getById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async findByPayload(payload: Payload) {
    const { email } = payload;
    return this.userModel.findOne({ email });
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const { email } = userDto;
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const createdUser = new this.userModel(userDto);
    await createdUser.save();
    return this.sanitizeUser(createdUser);
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndRemove(id);
  }

  async update(id: string, userDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, userDto, { new: true });
  }

  async findByLogin(userDTO: LoginDTO) {
    const { email, password } = userDTO;
    const user = await this.userModel
      .findOne({ email })
      .select('email password manager created name');
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    if (await bcrypt.compare(password, user.password)) {
      const userData = this.sanitizeUser(user);
      const { _id, manager } = userData;
      if (manager) {
        userData.projects = await this.projectService.findProjectByManagerId({
          managerID: _id,
        });
      }
      return userData;
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  sanitizeUser(user: User) {
    const sanitized = JSON.parse(JSON.stringify(user));
    delete sanitized['password'];
    return sanitized;
  }
}
