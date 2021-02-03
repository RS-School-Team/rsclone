import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from '../schema/create-task.dto';
import { Task, TaskDocument } from '../schema/task.schema';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async findByProjectId(id: string) {
    return await this.taskModel.find({ projectID: id });
  }

  async create(taskDTO: CreateTaskDto) {
    const createdTask = new this.taskModel(taskDTO);
    await createdTask.save();
    return createdTask;
  }
}
