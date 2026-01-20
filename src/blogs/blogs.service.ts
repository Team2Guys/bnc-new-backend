import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CommentStatus } from '@prisma/client';
import {
  CustomErrorHandler,
  getStatusNameByCode,
} from '../utils/helperFunctions';
import { CreateCommentDto } from './dto/create-comments.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class BlogsService {
  constructor(private prisma: PrismaService) {}

  async create(createBlogDto: Prisma.blogsCreateInput, req: Request | any) {
    const { email } = req.user;
    const existingBlog = await this.prisma.blogs.findFirst({
      where: { title: createBlogDto.title },
    });

    if (existingBlog) {
      const updatedBlog = await this.prisma.blogs.update({
        where: { id: existingBlog.id },
        data: { ...createBlogDto, last_editedBy: email },
      });

      return {
        message: 'Blog already existed and has been updated',
        blog: updatedBlog,
      };
    }
    const blog = await this.prisma.blogs.create({
      data: { ...createBlogDto, last_editedBy: email },
    });
    return { message: 'blog has been Created', blog };
  }

  async findAll() {
    try {
      const blogs = await this.prisma.blogs.findMany({
        include: { comments: true },
      });
      return blogs;
    } catch (error) {
      return CustomErrorHandler(error.message, 'BAD_REQUEST');
    }
  }

  async findOne(id: number) {
    try {
      const blog = await this.prisma.blogs.findUnique({
        where: { id: id },
        include: { comments: true },
      });
      return blog;
    } catch (error) {
      return CustomErrorHandler(error.message, 'BAD_REQUEST');
    }
  }

  async update(
    id: number,
    updateBlogDto: Prisma.blogsUpdateInput,
    req: Request | any,
  ) {
    try {
      const { email } = req.user;
      let updatedAt = new Date();
      const updated_blog = await this.prisma.blogs.update({
        where: { id: id },
        data: { ...updateBlogDto, last_editedBy: email, updatedAt },
      });

      if (!updateBlogDto)
        return CustomErrorHandler('Not Blog found', 'BAD_REQUEST');

      return {
        message: 'Blog has been updated',
        updated_blog,
      };
    } catch (error) {
      return CustomErrorHandler(error.message, 'BAD_REQUEST');
    }
  }

  async remove(id: number) {
    try {
      let existing_blog = await this.prisma.blogs.findUnique({
        where: { id: id },
        include: { comments: true },
      });
      if (!existing_blog)
        return CustomErrorHandler('No Blog found', 'BAD_REQUEST');
      console.log(existing_blog, 'blo');
      let commentFlag =
        existing_blog.comments && existing_blog.comments.length > 0
          ? true
          : false;

      const result = await this.prisma.$transaction([
        ...(commentFlag
          ? [
              this.prisma.blogs_comments.deleteMany({
                where: { blogId: id },
              }),
            ]
          : []),
        this.prisma.blogs.delete({
          where: { id },
        }),
      ]);

      console.log(result, 'result');
      return {
        message: 'Blog has been Deleted',
        blog: result[0],
      };
    } catch (error) {
      return CustomErrorHandler(error.message, 'BAD_REQUEST');
    }
  }

  async addComment(blog_id: number, createCommentDto: CreateCommentDto) {
    try {
      const { name, email, description } = createCommentDto;
      const blog = await this.prisma.blogs.findUnique({
        where: { id: blog_id },
      });

      if (!blog) return CustomErrorHandler('Invalid Blog Id', 'NOT_FOUND');

      const newComment = await this.prisma.blogs_comments.create({
        data: {
          name: name,
          Email: email,
          description: description,
          replies: [],
          blog: {
            connect: { id: blog_id },
          },
        },
      });
      return newComment;
    } catch (error) {
      console.log(error.status, 'error');
      let flag = error.status && error.status;
      return CustomErrorHandler(
        error.message,
        flag ? getStatusNameByCode(error.status) : 'BAD_REQUEST',
      );
    }
  }

  async addReply(comment_id: number, reply: CreateCommentDto) {
    try {
      const existingComment = await this.prisma.blogs_comments.findUnique({
        where: { id: comment_id },
        select: { replies: true },
      });

      if (!existingComment) {
        new NotFoundException('comments not found');
      }

      const replyObject = {
        name: reply.name,
        Email: reply.email,
        description: reply.description,
        createdAt: new Date(),
      };

      const updatedReplies = [...existingComment.replies, replyObject];

      const updatedComment = await this.prisma.blogs_comments.update({
        where: { id: comment_id },
        data: {
          replies: updatedReplies,
        },
      });

      return updatedComment;
    } catch (error) {
      let flag = error.status && error.status;
      return CustomErrorHandler(
        error.message,
        flag ? getStatusNameByCode(error.status) : 'BAD_REQUEST',
      );
    }
  }

  async updateStatus(id: number, status: string, req: Request | any) {
    try {
      console.log(req, 'req');
      const { email } = req;

      if (!Object.values(CommentStatus).includes(status as CommentStatus)) {
        throw new Error(
          `Invalid status: ${status}. Valid statuses are ${Object.values(CommentStatus).join(', ')}`,
        );
      }

      const existingBlog = await this.prisma.blogs_comments.findUnique({
        where: { id },
      });
      if (!existingBlog) {
        throw new NotFoundException('Comment not found');
      }

      const updatedBlog = await this.prisma.blogs_comments.update({
        where: { id },
        data: { status: status as CommentStatus, last_editedBy: email },
      });

      return {
        message: 'Comment status updated successfully',
        updatedBlog,
      };
    } catch (error) {
      console.error(error);
      return CustomErrorHandler(error.message, 'BAD_REQUEST');
    }
  }
}
