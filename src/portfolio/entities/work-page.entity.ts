import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { WorkDetail } from './work-detail.entity';

@Entity()
export class WorkPage {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ default: '' })
  title: string;

  @OneToMany(() => WorkDetail, (e) => e.workPage)
  @JoinColumn()
  public workDetail: WorkDetail[];

  @Column({ default: '' })
  articleId: string;

  @Column({ default: '' })
  lang: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
