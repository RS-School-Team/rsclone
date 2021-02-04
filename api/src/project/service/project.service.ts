import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDTO } from '../schema/create-project.dto';
import { Project, ProjectDocument } from '../schema/project.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async findProjectById(id: string): Promise<Project> {
    return this.projectModel.findById(id);
  }

  async findProjectByManagerId(managerID): Promise<Project[]> {
    return this.projectModel
      .find(managerID)
      .populate('tasks', '_id name description');
  }

  async createProject(projectDTO: CreateProjectDTO): Promise<Project> {
    // const createProject = {
    //   managerID: projectDTO.managerID,
    //   executorID: projectDTO.executorID,
    //   status: projectDTO.status,
    // };

    return await this.projectModel.create(projectDTO);
  }
}
