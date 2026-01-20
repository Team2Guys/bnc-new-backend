import { Injectable, Req } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CustomErrorHandler } from '../utils/helperFunctions';
import {
  CreateCategoryHandler,
  CreatesubCategoryHandler,
  withAsyncErrorHandling,
} from '../utils/DbHandlers';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async AddcategoryHandler(
    createCategoryDto: Prisma.CategoriesCreateInput,
    req: Request | any,
  ) {
    try {
      const { email } = req.user;
      return await CreateCategoryHandler(createCategoryDto, email);
    } catch (error: any) {
      console.log(error, 'err');
      return CustomErrorHandler(
        `${error.message || JSON.stringify(error)}`,
        'GATEWAY_TIMEOUT',
      );
    }
  }

  async DelCategoryhandle(id: number) {
    try {
      const category = await this.prisma.categories.findUnique({
        where: { id: id },
      });

      if (!category) {
        return CustomErrorHandler('Category not found', 'NOT_FOUND');
      }

      let response = await this.prisma.categories.delete({
        where: { id: id },
      });

      console.log(response, 'response');
      return response;
    } catch (error) {
      return CustomErrorHandler(
        `${error.message || JSON.stringify(error)}`,
        'INTERNAL_SERVER_ERROR',
      );
    }
  }

  async findsingleCategory(customUrls: string) {
    try {
      const category = await this.prisma.categories.findFirst({
        where: { categoryCustomUrl: customUrls },
        select: {
          Meta_Title: true,
          Meta_description: true,
          Canonical_Tag: true,
          posterImage: true,
        },
      });

      if (!category) {
        return CustomErrorHandler('Category not found', 'NOT_FOUND');
      }
      return category;
    } catch (error) {
      return CustomErrorHandler(
        `${error.message || JSON.stringify(error)}`,
        'INTERNAL_SERVER_ERROR',
      );
    }
  }

  async findsingleCategoryMain(customUrls: string) {
    try {
      const category = await this.prisma.categories.findFirst({
        where: { categoryCustomUrl: customUrls },
        select: {
          title: true,
          categoryCustomUrl: true,
          productCustomUrl: true,
          productpageHeading: true,
          posterImage: true,
          faqHeading: true,
          faqs: true,
          id: true,
          headingchecks: true,
          description: true,
          breakcrum: true,
          status: true,

          subCategories: {
            select: {
              title: true,
              id: true,
              status: true,
              customUrl: true,
            },
          },
          products: {
            select: {
              id: true,
              title: true,
              posterImage: true,
              short_description: true,
              status: true,
              customUrl: true,
              category: {
                select: {
                  title: true,
                  productCustomUrl: true,
                  status: true,
                },
              },
            },
          },
          recalledProducts: {
            select: {
              id: true,
              title: true,
              posterImage: true,
              short_description: true,
              status: true,
              customUrl: true,
              category: {
                select: {
                  title: true,
                  productCustomUrl: true,
                  status: true,
                },
              },
            },
          },
        },
      });

      if (!category) {
        return CustomErrorHandler('Category not found', 'NOT_FOUND');
      }
      return category;
    } catch (error) {
      return CustomErrorHandler(
        `${error.message || JSON.stringify(error)}`,
        'INTERNAL_SERVER_ERROR',
      );
    }
  }

  async CategoryUpdateHandler(
    id: number,
    updateCategoryDto: Prisma.CategoriesUpdateInput,
    @Req() req: Request | any,
  ) {
    try {
      const { email } = req.user;

      let category = await this.prisma.categories.findUnique({
        where: { id: id },
      });
      if (!category)
        return CustomErrorHandler('Category not found', 'NOT_FOUND');
      let updatedAt = new Date();
      const updatedCategory = await this.prisma.categories.update({
        where: { id: id },
        data: { ...updateCategoryDto, last_editedBy: email, updatedAt },
      });
      return updatedCategory;
    } catch (error) {
      return CustomErrorHandler(
        `${error.message || JSON.stringify(error)}`,
        'INTERNAL_SERVER_ERROR',
      );
    }
  }

  async getAllCategories() {
    try {
      let response = this.prisma.categories.findMany();
      return response;
    } catch (error) {
      return CustomErrorHandler(
        `${error.message || JSON.stringify(error)}`,
        'INTERNAL_SERVER_ERROR',
      );
    }
  }

  async AddsubCategoryHandler(
    createCategoryDto: Prisma.SubCategoriesCreateInput,
    @Req() req: Request | any,
  ) {
    try {
      const { email } = req.user;
      return await CreatesubCategoryHandler(createCategoryDto, email);
    } catch (error: any) {
      console.log(error, 'err');
      return CustomErrorHandler(
        `${error.message || JSON.stringify(error)}`,
        'GATEWAY_TIMEOUT',
      );
    }
  }

  async DelsubCategoryhandle(id: number) {
    try {
      console.log(id, 'id', typeof id);

      const category = await this.prisma.subCategories.findUnique({
        where: { id: id },
      });

      if (!category) {
        return CustomErrorHandler('Category not found', 'NOT_FOUND');
      }

      let response = await this.prisma.subCategories.delete({
        where: { id: id },
      });

      console.log(response, 'response');
      return response;
    } catch (error) {
      return CustomErrorHandler(
        `${error.message || JSON.stringify(error)}`,
        'INTERNAL_SERVER_ERROR',
      );
    }
  }

  async UpdatesubCategoryhandle(
    id: number,
    subCategory_update_data: Prisma.SubCategoriesUpdateInput,
    req: Request | any,
  ) {
    try {
      const { email } = req.user;

      const category = await this.prisma.subCategories.findUnique({
        where: { id: id },
      });

      if (!category)
        return CustomErrorHandler('Category not found', 'NOT_FOUND');
      let updatedAt = new Date();

      let response = await this.prisma.subCategories.update({
        where: { id: id },
        data: { ...subCategory_update_data, last_editedBy: email, updatedAt },
      });
      return response;
    } catch (error) {
      return CustomErrorHandler(
        `${error.message || JSON.stringify(error)}`,
        'INTERNAL_SERVER_ERROR',
      );
    }
  }

  async getsubAllCategories() {
    try {
      let response = this.prisma.subCategories.findMany({
        include: {
          products: {
            include: {
              category: {
                select: {
                  title: true,
                },
              },
            },
          },
          category: true,
        },
      });
      return response;
    } catch (error) {
      return CustomErrorHandler(
        `${error.message || JSON.stringify(error)}`,
        'INTERNAL_SERVER_ERROR',
      );
    }
  }
}
