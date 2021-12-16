import { CommentDTO } from './dtos/create-comment.dto';
import { CommentRO } from './dtos/comment.dto';
import { Idea } from './../idea/idea.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { RedisCacheService } from 'src/shared/cache/cache.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Idea) private ideaRepo: Repository<Idea>,
    private readonly redisCacheService: RedisCacheService,
  ) {}

  toResponseObject(comment: Comment): CommentRO {
    return {
      id: comment.id,
      created: comment.created,
      content: comment.content,
      author: comment.user.toResponseObject(false),
    };
  }

  async showAll(id: string): Promise<CommentRO[]> {
    try {
      const comments = await this.commentRepo.find({
        relations: ['user', 'idea'],
        where: { idea: id },
      });
      return comments.map((comment) => this.toResponseObject(comment));
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async create(commentDto: CommentDTO, userId: string): Promise<CommentRO> {
    const user = await this.userRepo.findOne({
      where: { id: userId },
    });

    const idea = await this.ideaRepo.findOne({
      where: { id: commentDto.ideaId },
    });

    if (!idea) throw new NotFoundException();

    const comment = this.commentRepo.create({
      ...commentDto,
      user: user,
      idea: idea,
    });
    await this.commentRepo.save(comment);
    return this.toResponseObject(comment);
  }
}
