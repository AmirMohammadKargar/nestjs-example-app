import { CacheModule, Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Idea } from 'src/idea/idea.entity';
import { User } from 'src/user/user.entity';
import { Comment } from './comment.entity';
import { RedisCacheModule } from 'src/shared/cache/cache.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Idea, User, Comment]),
    RedisCacheModule,
    CacheModule.register({
      ttl: 5,
      max: 100,
    }),
  ],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
