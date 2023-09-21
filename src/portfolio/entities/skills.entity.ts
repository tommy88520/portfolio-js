import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Skills {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ default: '' })
  skill: string;

  @Column({ default: '' })
  image: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
