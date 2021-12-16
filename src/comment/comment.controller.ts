import { CommentRO } from './dtos/comment.dto';
import { CommentDTO } from './dtos/create-comment.dto';
import { CommentService } from './comment.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { User } from 'src/user/decorators/user.decorator';
import { ValidationPipe } from 'src/shared/validation.pipe';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';

@ApiTags('Comments')
@Controller({ path: 'comment', version: '1' })
@UseGuards(new AuthGuard())
@ApiBearerAuth('JWT-auth')
@ApiResponse({ status: 403, description: 'Not Authorized' })
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: 'Return all comment of idea' })
  @ApiOkResponse({
    type: CommentRO,
    isArray: true,
    description: 'Return all comment of idea',
  })
  @Get(':id')
  showComment(@Param('id') id: string) {
    return this.commentService.showAll(id);
  }

  @ApiOperation({ summary: 'Create comment for an idea' })
  @ApiCreatedResponse({
    type: CommentRO,
    description: 'Create comment for an idea',
  })
  @Post()
  @UsePipes(new ValidationPipe())
  createComment(@User('id') userId, @Body() body: CommentDTO) {
    return this.commentService.create(body, userId);
  }
}
