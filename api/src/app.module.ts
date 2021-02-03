import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrderModule } from './order/order.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { MessageModule } from './message/message.module';
import { ProcessModule } from './process/process.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useCreateIndex: true,
    }),
    AuthModule,
    UsersModule,
    OrderModule,
    ProjectModule,
    TaskModule,
    MessageModule,
    ProcessModule,
  ],
})
export class AppModule {}
