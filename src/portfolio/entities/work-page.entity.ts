import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Work } from './work.entity';
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

  // @ManyToOne(() => Work, (e) => e.workPage, {
  //   cascade: true,
  //   onDelete: 'CASCADE',
  // })
  // public work: Work;

  @Column({ default: '' })
  articleId: string;

  @Column({ default: '' })
  lang: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
