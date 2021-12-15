import { Idea } from './idea.entity';
import { AuthGuard } from './../guard/auth.guard';
import { ValidationPipe } from './../shared/validation.pipe';
import { IdeaDTO } from './dtos/idea.dto';
import { IdeaService } from './idea.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { User } from 'src/user/decorators/user.decorator';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Ideas')
@Controller({ path: 'idea', version: '1' })
@UseGuards(new AuthGuard())
@ApiBearerAuth('JWT-auth')
@ApiResponse({ status: 401, description: 'Not Authorized' })
export class IdeaController {
  constructor(private ideaService: IdeaService) {}

  @ApiOperation({ summary: 'Return all ideas' })
  @ApiOkResponse({
    type: Idea,
    isArray: true,
    description: 'Return all ideas',
  })
  @Get()
  showAllIdea(@User() user) {
    console.log(user);
    return this.ideaService.showAll();
  }

  @ApiOperation({ summary: 'Create new idea and return it' })
  @ApiCreatedResponse({
    type: Idea,
    description: 'Create new idea and return it',
  })
  @Post()
  @UsePipes(new ValidationPipe())
  createIdea(@User('id') userId, @Body() body: IdeaDTO) {
    return this.ideaService.create(body, userId);
  }

  @ApiOperation({ summary: 'Return an idea' })
  @ApiOkResponse({ type: Idea, description: 'Return an idea' })
  @Get(':id')
  readIdea(@User() user, @Param('id') id: string) {
    return this.ideaService.read(id);
  }

  @ApiOperation({ summary: 'Update an idea' })
  @ApiCreatedResponse({
    type: Idea,
    description: 'Update an idea',
  })
  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateIdea(
    @User() user,
    @Param('id') id: string,
    @Body() body: Partial<IdeaDTO>,
  ) {
    return this.ideaService.update(id, body);
  }

  @ApiOperation({ summary: 'Delete an idea' })
  @ApiOkResponse({ status: 200, description: 'Delete an idea' })
  @Delete(':id')
  deleteIdea(@User() user, @Param('id') id: string) {
    return this.ideaService.delete(id);
  }
}
