import { User } from './user.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from './dtos/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async showAll() {
    const users = await this.userRepo.find();
    return users.map((user) => user.toResponseObject(false));
  }

  async login(data: UserDTO) {
    const { username, password } = data;
    const user = await this.userRepo.findOne({ where: { username } });
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException(
        'Invalid username or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    return user.toResponseObject(true);
  }

  async register(data: UserDTO) {
    const { username } = data;
    let user = await this.userRepo.findOne({ where: { username } });
    if (user) {
      throw new HttpException(
        'Username already taken!',
        HttpStatus.BAD_REQUEST,
      );
    }
    user = await this.userRepo.create(data);
    await this.userRepo.save(user);

    return user.toResponseObject(true);
  }
}
