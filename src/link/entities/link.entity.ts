import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'links' })
export class LinkEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;
  @Column()
  originalUrl: string;
  @Column({ default: 0 })
  clicks: number;
  @CreateDateColumn()
  createdAt: Date;
}
