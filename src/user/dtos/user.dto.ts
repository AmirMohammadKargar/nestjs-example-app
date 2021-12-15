import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserDTO {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class UserRO {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  created: Date;

  @ApiProperty()
  token?: string;
}
