import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type TaskDocument = Task & mongoose.Document;

@Schema()
export class Task {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
  projectID: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ default: Date.now })
  created: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
