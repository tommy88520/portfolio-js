import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { WorkPage } from './work-page.entity';
import { WorkDetailImage } from './work-detail-image.entity';

@Entity()
export class WorkDetail {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ default: '' })
  title: string;

  @Column()
  content: string;

  @OneToMany(() => WorkDetailImage, (e) => e.workDetail)
  @JoinColumn()
  public workDetailImages: WorkDetailImage[];

  @ManyToOne(() => WorkPage, (e) => e.workDetail, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  public workPage: WorkPage;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
