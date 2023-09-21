// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// export type MenuDocument = Document & Menu;

// @Schema({ collection: 'menu' })
// export class Menu {
//   @Prop()
//   navigation: string;

//   @Prop()
//   image: string;
// }

// export const MenuSchema = SchemaFactory.createForClass(Menu);

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ default: '' })
  navigation: string;

  @Column({ default: '' })
  image: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
