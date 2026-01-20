import { Injectable } from '@nestjs/common';
import { CreateContactDto, CreateReviewDto, CreateRirectUrls } from './dto/create-review.dto';
import { UpdateReviewDto, UpdateRirectUrls } from './dto/update-review.dto';
import { CustomErrorHandler } from 'src/utils/helperFunctions';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) { }
  async create(createReviewDto: CreateReviewDto) {
    try {
      return await this.prisma.reviews.create({ data: createReviewDto })
    } catch (error: any) {
      console.log(error, "err")
      return CustomErrorHandler(`${error.message || JSON.stringify(error)}`, 'GATEWAY_TIMEOUT')
    }
  }

  async findAll() {
    try {
      return await this.prisma.reviews.findMany()

    } catch (error: any) {
      console.log(error, "err")
      return CustomErrorHandler(`${error.message || JSON.stringify(error)}`, 'GATEWAY_TIMEOUT')
    }
  }

  async findOne(id: number) {
    try {

      return await this.prisma.reviews.findUnique({ where: { id } })

    } catch (error: any) {
      console.log(error, "err")
      return CustomErrorHandler(`${error.message || JSON.stringify(error)}`, 'GATEWAY_TIMEOUT')
    }
  }

  async update(updateReviewDto: UpdateReviewDto) {
    try {
      const { id, ...withoutid } = updateReviewDto
      let updatedAt = new Date()
      await this.prisma.reviews.update({ where: { id }, data: { ...withoutid, updatedAt: updatedAt } })
      return { message: "Reviews has been updated" }
    } catch (error: any) {
      console.log(error, "err")
      return CustomErrorHandler(`${error.message || JSON.stringify(error)}`, 'GATEWAY_TIMEOUT')
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.reviews.delete({ where: { id } })
    } catch (error: any) {
      console.log(error, "err")
      return CustomErrorHandler(`${error.message || JSON.stringify(error)}`, 'GATEWAY_TIMEOUT')
    }
  }

  // Redirect urls 

  async createRedirectUrl(CreateRirectUrls: CreateRirectUrls) {
    try {
      return await this.prisma.redirecturls.create({ data: CreateRirectUrls })
    } catch (error: any) {
      console.log(error, "err")
      return CustomErrorHandler(`${error.message || JSON.stringify(error)}`, 'GATEWAY_TIMEOUT')
    }
  }


  async findAllRedirectUrl() {
    try {
      let category = await this.prisma.redirecturls.findMany()
      if (!category) return CustomErrorHandler("redirect urls not not found", 'GATEWAY_TIMEOUT')
      return category;
    } catch (error: any) {
      console.log(error, "err")
      return CustomErrorHandler(`${error.message || JSON.stringify(error)}`, 'GATEWAY_TIMEOUT')
    }
  }

  async findOneRedirectUrls(url: string) {
    try {
      console.log(url, "urls")
      let category = await this.prisma.redirecturls.findUnique({ where: { url}, select: { redirectedUrl: true, url: true } })
      console.log(category, "category", url)
      if (!category) return CustomErrorHandler("redirect urls not not found", 'GATEWAY_TIMEOUT')
      return category;
    } catch (error: any) {
      console.log(error, "err")
      return CustomErrorHandler(`${error.message || JSON.stringify(error)}`, 'GATEWAY_TIMEOUT')
    }
  }


  async updateOneRedirectUrls(UpdateRirectUrls: UpdateRirectUrls) {
    try {
      let updatedAt = new Date()
      const { id, ...withoutid } = UpdateRirectUrls
      return await this.prisma.redirecturls.update({ where: { id }, data: { ...withoutid, updatedAt } })
    } catch (error: any) {
      console.log(error, "err")
      return CustomErrorHandler(`${error.message || JSON.stringify(error)}`, 'GATEWAY_TIMEOUT')
    }
  }

  async removeRedirectUrls(id: number) {
    try {
      await this.prisma.redirecturls.delete({ where: { id } })
    } catch (error: any) {
      console.log(error, "err")
      return CustomErrorHandler(`${error.message || JSON.stringify(error)}`, 'GATEWAY_TIMEOUT')
    }
  }





}
