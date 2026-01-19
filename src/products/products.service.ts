import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CustomErrorHandler } from '../utils/helperFunctions';
import { generateSlug, getAllproducts } from '../utils/DbHandlers'
import { Prisma } from '@prisma/client';
import { Response, Request } from 'express';
import { GetProductDto } from './dto/create-prod.dto';


@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) { }

    gethellow(): string {
        return 'this is hellow from product';
    }

    AddProductHandler = async (createCategoryDto: Prisma.productsCreateInput, req: Request | any) => {

        const { email } = req.user
        const { title } = createCategoryDto;

        let AlreadyExistedProduct = await this.prisma.products.findUnique({ where: { title: title } })
        if (AlreadyExistedProduct) return CustomErrorHandler("Product Already Exist", 'BAD_REQUEST')


        try {
            let response = await this.prisma.products.create({
                data: { ...createCategoryDto, last_editedBy: email },
                include: {
                    category: true,
                    subCategory: true
                }
            });
            return { product: response, message: "Product has been added Successfully" }
        } catch (error: any) {
            console.log(error, "err")
            return CustomErrorHandler(`${error.message || JSON.stringify(error)}`, 'GATEWAY_TIMEOUT')

        }
    }

    getAllProducts = async () => {
        try {
            return await getAllproducts()
        } catch (err) {
            return CustomErrorHandler(`${err.message}`, 'BAD_REQUEST')
        }
    }

    UpdateProductHandler = async (id: number, updateProduct: Prisma.productsUpdateInput, req: Request | any) => {
        try {
            const { email } = req.user
            let product = await this.prisma.products.findUnique({
                where: { id: id },
                include: { subCategory: true },
            });
            if (!product) {
                return CustomErrorHandler("Product not found", "NOT_FOUND");
            }
            let updatedAt = new Date()
            let updated_products = await this.prisma.products.update({
                where: { id: id },
                data: { ...updateProduct, last_editedBy: email, updatedAt },
                include: { subCategory: true, category: true },
            });

            return { updated_products, message: "Product has been updated successfully" };
        } catch (error) {
            return CustomErrorHandler(`${error.message || JSON.stringify(error)}`, "INTERNAL_SERVER_ERROR");
        }
    };

    DeleteProductHanlder = async (id: number) => {
        try {
            let product = await this.prisma.products.findUnique({ where: { id: id } })
            if (!product) return CustomErrorHandler('No Product found', 'NOT_FOUND')

            let delted_products = await this.prisma.products.delete({ where: { id: id } })
            return { delted_products, message: "Product has been deleted Successfully" }


        } catch (error) {
            return CustomErrorHandler(`${error.message || JSON.stringify(error)}`, 'INTERNAL_SERVER_ERROR');

        }
    }

    getSignleProd = async (GetProductDto: GetProductDto) => {
        try {
        const query: Prisma.productsFindManyArgs = GetProductDto.fields
  ? { select: { ...GetProductDto.fields, category: true } }
  : { include: { category: true } };



// Fetch products with correct type
const products: any[] = await this.prisma.products.findMany(query);

            const product = products.find(
                (p) => (p.customUrl === GetProductDto.Productname || generateSlug(p.title) === GetProductDto.Productname) &&
                    (p.category.productCustomUrl == GetProductDto.category || generateSlug(p.category.title) == GetProductDto.category)
            );

            if (!product) {
                const subcategories = await this.prisma.subCategories.findMany({
                    include: {
                        category: true,
                        products: true
                    }
                })

                let subcategory = subcategories.find(
                    (p) => (p.customUrl === GetProductDto.Productname || generateSlug(p.title) === GetProductDto.Productname)
                        &&
                        (p.category.productCustomUrl == GetProductDto.category || generateSlug(p.category.title) == GetProductDto.category)
                );

                if (!subcategory) return CustomErrorHandler("Not found ", "NOT_FOUND")

                return { product: subcategory, type: "subcategory" };

            }


            return { product, type: "Product" };
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

}


