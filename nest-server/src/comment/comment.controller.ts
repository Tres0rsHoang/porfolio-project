import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ValidationPipe,
  ParseIntPipe,
  Query,
  UseGuards,
  Request,
  UnauthorizedException,
  Patch,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PagingDto } from 'src/dto/paging.dto';
import { Roles, RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Role } from 'src/auth/entity/role.entity';
import { Request as exRequest } from 'express';
import { AuthCreatecommentDto } from './dto/auth-create-comment.dto';
import { PublicUser } from 'src/auth/entity/public-user.entity';
import CommentEditDto from './dto/edit-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  anonymousCreate(@Body(ValidationPipe) createCommentDto: CreateCommentDto) {
    return this.commentService.anonymousCreate(createCommentDto);
  }

  @Post('/auth')
  @UseGuards(JwtAuthGuard)
  authCreate(
    @Body(ValidationPipe) authCreateCommentDto: AuthCreatecommentDto,
    @Request() req: exRequest,
  ) {
    const reqData = req.user;
    if (!reqData) throw new UnauthorizedException('Invalid user id');
    const user: PublicUser | null = reqData['user'] as PublicUser | null;
    if (!user) throw new UnauthorizedException('Invalid user id');
    return this.commentService.authCreate(user, authCreateCommentDto.content);
  }

  @Get()
  findAll(@Query() pagingDto: PagingDto) {
    return this.commentService.findAll(pagingDto);
  }

  @Post(':id')
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Roles(Role.ADMIN)
  reply(@Param('id', ParseIntPipe) id: number, @Request() req: exRequest) {
    void id;
    if (!req.user) return UnauthorizedException;
    return 'This function is using to reply a comment';
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async editComment(
    @Param('id', ParseIntPipe) commentId: number,
    @Body(ValidationPipe) commentEditDto: CommentEditDto,
    @Request() req: exRequest,
  ) {
    const reqRawUser = req.user;
    if (!reqRawUser) throw new UnauthorizedException('Invalid user id');
    const publicUser: PublicUser = (
      reqRawUser as {
        sub: number;
        user: PublicUser;
      }
    ).user;

    if (!publicUser.roles.includes(Role.ADMIN)) {
      const valid = await this.commentService.validateUserOnComment(
        commentId,
        publicUser.id,
      );
      if (!valid) throw new UnauthorizedException('Invalid comment id');
    }
    return await this.commentService.editContent(
      commentId,
      commentEditDto.content,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteComment(
    @Param('id', ParseIntPipe) commentId: number,
    @Request() req: exRequest,
  ) {
    const reqRawUser = req.user;
    if (!reqRawUser) throw new UnauthorizedException('Invalid user id');
    const publicUser: PublicUser = (
      reqRawUser as {
        sub: number;
        user: PublicUser;
      }
    ).user;
    if (!publicUser.roles.includes(Role.ADMIN)) {
      const valid = await this.commentService.validateUserOnComment(
        commentId,
        publicUser.id,
      );
      if (!valid) throw new UnauthorizedException('Invalid comment id');
    }
    return this.commentService.deleteContent(commentId);
  }
}
