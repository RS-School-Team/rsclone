import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import { UsersService } from './service/users.service';
import { User, UserSchema } from './schema/user.schema';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './controller/users.controller';
import { ProjectModule } from 'src/project/project.module';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [
    ProjectModule,
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        imports: [ConfigModule],
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', async function (next: mongoose.HookNextFunction) {
            try {
              if (!this.isModified('password')) {
                return next();
              }
              this['password'] = await bcrypt.hash(this['password'], 10);
              return next();
            } catch (err) {
              return next(err);
            }
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [UsersController],
})
export class UsersModule {}
