import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CommentDTO {
  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsString()
  ideaId: string;
}
