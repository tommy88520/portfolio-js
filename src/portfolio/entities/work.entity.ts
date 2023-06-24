import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WorkDocument = Document & Work;

@Schema({ collection: 'work' })
export class Work {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  tag: string[];
}

export const WorkSchema = SchemaFactory.createForClass(Work);
