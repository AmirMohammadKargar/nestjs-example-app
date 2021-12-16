import { UserRO } from './../../user/dtos/user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CommentRO {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  created: Date;

  @ApiProperty()
  content: string;

  @ApiProperty()
  author: UserRO;
}
