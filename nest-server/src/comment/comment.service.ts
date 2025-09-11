import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { DatabaseService } from 'src/database/database.service';
import { PagingDto } from 'src/dto/paging.dto';
import { Paging } from 'src/entity/paging.entity';
import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client';
import EventsGateway from 'src/socket/events.gateway';
import { PublicUser } from 'src/auth/entity/public-user.entity';

@Injectable()
export class CommentService {
  constructor(
    private readonly userService: UserService,
    private readonly databaseService: DatabaseService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  private CommentProps = {
    id: true,
    content: true,
    createAt: true,
    user: {
      select: {
        id: true,
        name: true,
        company: true,
        gender: true,
      },
    },
    replies: {
      select: {
        id: true,
        content: true,
        createAt: true,
        user: {
          select: {
            id: true,
            name: true,
            company: true,
            gender: true,
          },
        },
      },
    },
  };

  private async newComment({
    userId,
    userName,
    content,
    haveNoti = true,
  }: {
    userId: number;
    userName: string;
    content: string;
    haveNoti?: boolean;
  }) {
    const formatedContent = content.trimEnd().trimStart();
    const newComment = await this.databaseService.comment.create({
      data: {
        userId: userId,
        content: formatedContent,
      },
      select: {
        ...this.CommentProps,
      },
    });

    if (haveNoti) {
      this.eventsGateway.emitMessage({
        event: 'newNotificaion',
        data: `${userName} have just drop a new comment`,
      });
      this.eventsGateway.emitMessage({
        event: 'newComment',
        data: newComment,
      });
    }
    return newComment;
  }

  async anonymousCreate(createCommentDto: CreateCommentDto) {
    let user: User | null = null;
    if (!createCommentDto.userId) {
      user = await this.userService.getNewUser({
        name: createCommentDto.name,
        company: createCommentDto.company,
        gender: createCommentDto.gender,
      });
    } else {
      user = await this.userService.getUserById(createCommentDto.userId);
    }
    if (!user) throw new BadRequestException('Invalid user id');
    return await this.newComment({
      userId: user.id,
      userName: user.name,
      content: createCommentDto.content,
    });
  }

  async authCreate(user: PublicUser, content: string) {
    return await this.newComment({
      userId: user.id,
      userName: user.name,
      content: content,
    });
  }

  async findAll(paging: PagingDto) {
    const { page, limit } = paging;
    if (!page || !limit) {
      return BadRequestException;
    }
    const [comments, count] = await Promise.all([
      this.databaseService.comment.findMany({
        select: {
          ...this.CommentProps,
        },
        where: {
          parrentCommentId: {
            equals: null,
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createAt: 'desc',
        },
      }),
      this.databaseService.comment.count(),
    ]);

    const resPaging: Paging = {
      page: page,
      limit: limit,
      total: count,
      totalPage: Math.ceil(count / limit),
    };

    return {
      data: comments,
      paging: resPaging,
    };
  }

  async validateUserOnComment(
    commentId: number,
    userId: number,
  ): Promise<boolean> {
    const existComment = await this.databaseService.comment.findFirst({
      where: {
        userId: userId,
        id: commentId,
      },
    });
    if (!existComment) return false;
    return true;
  }

  async editContent(commentId: number, content: string) {
    const formatedContent = content.trimEnd().trimStart();
    const newComment = await this.databaseService.comment.update({
      where: {
        id: commentId,
      },
      data: {
        content: formatedContent,
      },
      select: {
        ...this.CommentProps,
      },
    });

    if (!newComment) {
      throw new BadRequestException('Invalid comment id');
    }

    this.eventsGateway.emitMessage({
      event: 'updatedComment',
      data: {
        updatedComment: [newComment],
      },
    });

    return newComment;
  }

  async deleteContent(commentId: number) {
    const result = await this.databaseService.comment.delete({
      where: {
        id: commentId,
      },
      select: {
        ...this.CommentProps,
      },
    });
    if (!result) throw new UnauthorizedException('Invalid comment id');
    this.eventsGateway.emitMessage({
      event: 'deletedComment',
      data: commentId,
    });
    return result;
  }

  async replyComment(props: {
    commentId: number;
    adminUser: PublicUser;
    content: string;
  }) {
    const newComment = await this.newComment({
      userId: props.adminUser.id,
      userName: props.adminUser.name,
      content: props.content,
      haveNoti: false,
    });

    const updatedComment = await this.databaseService.comment.update({
      where: {
        id: newComment.id,
      },
      data: {
        parrentCommentId: props.commentId,
      },
      select: {
        ...this.CommentProps,
      },
    });

    const parrentComment = await this.databaseService.comment.findFirst({
      where: {
        id: props.commentId,
      },
      select: {
        ...this.CommentProps,
      },
    });

    this.eventsGateway.emitMessage({
      event: 'updatedComment',
      data: {
        updatedComment: [parrentComment],
      },
    });
    return updatedComment;
  }
}
