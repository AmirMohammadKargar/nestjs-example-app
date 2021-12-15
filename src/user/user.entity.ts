import { Idea } from './../idea/idea.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @CreateDateColumn()
  created: Date;

  @ApiProperty()
  @CreateDateColumn()
  updated: Date;

  @ApiProperty()
  @Column({
    type: 'text',
    unique: true,
  })
  username: string;

  @Column('text')
  password: string;

  @OneToMany((type) => Idea, (idea) => idea.author)
  ideas: Idea;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  toResponseObject(showToken: boolean) {
    const { id, created, username, token } = this;
    let responseObject;
    if (showToken) {
      responseObject = { id, created, username, token };
    } else {
      responseObject = { id, created, username };
    }
    return responseObject;
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  private get token() {
    const { id, username } = this;
    return jwt.sign(
      {
        id,
        username,
      },
      process.env.SECRET,
      {
        expiresIn: '7d',
      },
    );
  }
}
