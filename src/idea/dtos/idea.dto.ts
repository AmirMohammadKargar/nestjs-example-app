import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UserRO } from 'src/user/dtos/user.dto';

export class IdeaDTO {
  @ApiProperty()
  @IsString()
  idea: string;

  @ApiProperty()
  @IsString()
  description: string;
}

export class IdeaRO {
  id?: string;
  created: Date;
  idea: string;
  description: string;
  author: UserRO;
}
