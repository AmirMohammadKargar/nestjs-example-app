import { UserRO } from 'src/user/dtos/user.dto';
import { User } from './user.entity';
import { ValidationPipe } from './../shared/validation.pipe';
import { UserDTO } from './dtos/user.dto';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiTags,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';

@ApiTags('Users')
@Controller({
  version: '1',
  path: 'user',
})
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Return all users' })
  @ApiOkResponse({
    type: User,
    isArray: true,
    description: 'Return all users',
  })
  @Get('users')
  @UseGuards(new AuthGuard())
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 401, description: 'Not Authorized' })
  showAllUsers() {
    return this.userService.showAll();
  }

  @ApiOperation({ summary: 'Login the user and return token' })
  @ApiCreatedResponse({
    type: UserRO,
    description: 'Login the user and return token',
  })
  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() data: UserDTO) {
    return this.userService.login(data);
  }

  @ApiOperation({ summary: 'Register the user and return user info' })
  @ApiOkResponse({
    type: UserRO,
    description: 'Register the user and return user info',
  })
  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() data: UserDTO) {
    return this.userService.register(data);
  }
}
