import { IdeaDTO, IdeaRO } from './dtos/idea.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Idea } from './idea.entity';
import { User } from 'src/user/user.entity';
import { UserRO } from 'src/user/dtos/user.dto';

@Injectable()
export class IdeaService {
  constructor(
    @InjectRepository(Idea) private ideaRepo: Repository<Idea>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  toResponseObject(idea: Idea): IdeaRO {
    return { ...idea, author: idea.author.toResponseObject(false) };
  }

  async showAll(): Promise<IdeaRO[]> {
    const ideas = await this.ideaRepo.find({ relations: ['author'] });
    return ideas.map((idea) => this.toResponseObject(idea));
  }

  async create(data: Partial<IdeaDTO>, userId: string): Promise<IdeaRO> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    const idea = this.ideaRepo.create({ ...data, author: user });
    await this.ideaRepo.save(idea);
    return this.toResponseObject(idea);
  }

  async read(id: string): Promise<IdeaRO> {
    const idea = await this.ideaRepo.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!idea) {
      throw new NotFoundException();
    }

    return this.toResponseObject(idea);
  }

  async update(id: string, data: Partial<IdeaDTO>): Promise<IdeaRO> {
    const idea = await this.ideaRepo.findOne(id);
    if (!idea) {
      throw new NotFoundException();
    }

    await this.ideaRepo.update(id, data);

    return this.toResponseObject(idea);
  }

  async delete(id: string) {
    const idea = await this.ideaRepo.findOne(id);
    if (!idea) {
      throw new NotFoundException();
    }

    await this.ideaRepo.delete(id);

    return { deleted: true };
  }
}
