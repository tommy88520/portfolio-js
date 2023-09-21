import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Tag } from './tag.entity';

@Entity()
export class Work {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ default: '' })
  title: string;

  @Column({ default: '' })
  content: string;

  @OneToMany(() => Tag, (tag) => tag.work)
  @JoinColumn()
  public tags: Tag[];

  @Column({ default: 'en' })
  lang: string;

  @Column({ default: 1 })
  orderNumber: number;

  @Column({ default: '' })
  workImage: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
