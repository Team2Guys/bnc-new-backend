import { PartialType } from '@nestjs/swagger';
import { CreateBlogDto } from './create-blog.dto';
import { CommentStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {}
export class UpdateStatusDto {
  @IsEnum(CommentStatus, {
    message: 'Status must be one of PENDING, WORKING, COMPLETED, ARCHIVED',
  })
  status: CommentStatus;
}
