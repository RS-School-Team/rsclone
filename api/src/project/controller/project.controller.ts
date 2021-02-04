import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from 'src/task/service/task.service';
import { CreateProjectDTO } from '../schema/create-project.dto';
import { Project } from '../schema/project.schema';
import { ProjectService } from '../service/project.service';

@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly taskService: TaskService,
  ) {}
  @Get(':id')
  async findProjectById(@Param('id') id: string): Promise<Project> {
    return this.projectService.findProjectById(id);
  }

  @Get()
  async findProjectByManagerId(@Body() managerID: string): Promise<Project[]> {
    return this.projectService.findProjectByManagerId(managerID);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() projectDTO: CreateProjectDTO) {
    return this.projectService.createProject(projectDTO);
  }

  @Put(':id')
  // @UseGuards(AuthGuard('jwt'), SellerGuard)
  async update(
    @Param('id') id: string,
    @Body() project: UpdateProjectDTO,
    @User() user: UserDocument,
  ): Promise<Product> {
    const { id: userId } = user;
    return await this.projectService.update(id, product, userId);
  }

  // @Delete()
}
