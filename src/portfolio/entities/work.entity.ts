import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WorkDocument = Document & Work;

@Schema({ collection: 'work', timestamps: true })
export class Work {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  tag: string[];

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const WorkSchema = SchemaFactory.createForClass(Work);
