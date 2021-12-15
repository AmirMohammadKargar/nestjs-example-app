import { Idea } from './idea.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule, Module } from '@nestjs/common';
import { IdeaController } from './idea.controller';
import { IdeaService } from './idea.service';
import { User } from 'src/user/user.entity';
import { RedisCacheModule } from 'src/shared/cache/cache.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Idea, User]),
    RedisCacheModule,
    CacheModule.register({
      ttl: 5,
      max: 100,
    }),
  ],
  controllers: [IdeaController],
  providers: [IdeaService],
})
export class IdeaModule {}
