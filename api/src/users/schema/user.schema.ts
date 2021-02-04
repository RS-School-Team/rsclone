import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ default: false })
  manager: boolean;

  @Prop(
    raw({
      firstName: { type: String },
      lastName: { type: String },
    }),
  )
  name: Record<string, any>;

  @Prop({ default: Date.now })
  created: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
