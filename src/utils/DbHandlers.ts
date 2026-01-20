import { PrismaService } from '../../prisma/prisma.service';
import { CustomErrorHandler } from '../utils/helperFunctions';
import { createCategorydto } from '../dto/category.dto';
import { Prisma } from '@prisma/client';

const prisma = new PrismaService();

export const getAllproducts = async () => {
  try {
    let products = await prisma.products.findMany({
      include: {
        subCategory: true,
        category: true,
        recalledByCategories: true,
      },
    });
    return products;
  } catch (error) {
    console.error('Error fetching products:', error.message);
    throw {
      status: 'error',
      message: `Error fetching products: ${error.message}`,
      stack: error.stack,
    };
  }
};

export const CreateCategoryHandler = async (
  createCategoryDto: Prisma.CategoriesCreateInput,
  email: string,
) => {
  try {
    const { title, posterImage } = createCategoryDto;
    let products: any = [];

    let AlreadyExistedProduct = await prisma.categories.findUnique({
      where: { title: title },
    });
    if (AlreadyExistedProduct)
      return CustomErrorHandler('Category Already Exist', 'BAD_REQUEST');
    let response = await prisma.categories.create({
      data: { ...createCategoryDto, last_editedBy: email },
    });
    return response;
  } catch (error) {
    console.error('Error fetching products:', error.message);
    throw {
      status: 'error',
      message: `Error fetching products: ${error.message}`,
      stack: error.stack,
    };
  }
};

export function withAsyncErrorHandling<T>(fn: (...args: any[]) => Promise<T>) {
  return async (...args: any[]): Promise<[T | null, any | null]> => {
    try {
      const result = await fn(...args);
      return [result, null];
    } catch (error) {
      return [null, error];
    }
  };
}

export const CreatesubCategoryHandler = async (
  createCategoryDto: Prisma.SubCategoriesCreateInput,
  email: string,
) => {
  let response = await prisma.subCategories.create({
    data: { ...createCategoryDto, last_editedBy: email },
  });

  return response;
};

export const generateSlug = (text: string) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};
