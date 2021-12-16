import { User } from './../user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Comment } from 'src/comment/comment.entity';

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

  @ApiProperty()
  @OneToMany((type) => Comment, (comment) => comment.idea)
  comments: Comment[];
}
