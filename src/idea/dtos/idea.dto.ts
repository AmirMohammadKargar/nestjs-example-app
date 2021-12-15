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
  @ApiProperty()
  id?: string;

  @ApiProperty()
  created: Date;

  @ApiProperty()
  idea: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  author: UserRO;
}
