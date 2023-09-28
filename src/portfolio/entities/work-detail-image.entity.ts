import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { WorkDetail } from './work-detail.entity';
@Entity()
export class WorkDetailImage {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ default: '' })
  image: string;

  @ManyToOne(() => WorkDetail, (image) => image.workDetailImages, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  public workDetail: WorkDetail;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
