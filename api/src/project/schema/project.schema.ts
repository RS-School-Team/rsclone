import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Task } from 'src/task/schema/task.schema';

export type ProjectDocument = Project & mongoose.Document;

@Schema()
export class Project {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  managerID: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    default: [],
  })
  tasks: string[];

  @Prop()
  name: string;

  @Prop({ default: Date.now })
  created: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
