import { User } from './../user/user.entity';
import { Idea } from './../idea/idea.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('comment')
export class Comment {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty()
  @Column()
  content: string;

  @ApiProperty()
  @CreateDateColumn()
  created: Date;

  @ApiProperty()
  @ManyToOne(() => Idea, (idea) => idea.comments)
  idea: Idea;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.comments)
  user: User;
}
