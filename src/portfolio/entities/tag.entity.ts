import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Work } from './work.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ default: '' })
  tag: string;

  @ManyToOne(() => Work, (work) => work.tags, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  public work: Work;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
