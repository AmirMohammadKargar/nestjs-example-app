import { User } from './../user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('idea')
export class Idea {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column('text')
  idea: string;

  @ApiProperty()
  @Column('text')
  description: string;

  @ApiProperty()
  @CreateDateColumn()
  created: Date;

  @ApiProperty()
  @ManyToOne((type) => User, (author) => author.ideas)
  author: User;
}
