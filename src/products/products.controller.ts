import { Body, Controller, Delete, Get, Param, Post, Put, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from '../dto/product.dto'
import { Prisma } from '@prisma/client';
import { Response, Request } from 'express';
import { GetProductDto } from './dto/create-prod.dto';


@Controller('products')
export class ProductsController {
  constructor(private readonly ProductsService: ProductsService) { }

  @Get()
  getHello(): string {
    return this.ProductsService.gethellow();
  }


  @Post("AddProduct")
  async CreateProducthandler(@Body() createCategoryDto: Prisma.productsCreateInput, @Req() req: Request) {
    return this.ProductsService.AddProductHandler(createCategoryDto, req);
  }


  @Get("GetAllProducts")
  async getAllProducts() {
    return this.ProductsService.getAllProducts()
  }


  @Put("edit_product/:id")
  async edit_product(@Param("id") id: number, @Body() updated_product: Prisma.productsUpdateInput, @Req() req: Request) {
    return this.ProductsService.UpdateProductHandler(+id, updated_product, req)
  }

  @Post("getSignleProd")
  async getSignleProd(@Body() updated_product: GetProductDto) {
    return this.ProductsService.getSignleProd(updated_product)
  }


  @Delete("delete_product/:id")
  async DeleteProductHanlder(@Param("id") id: number,) {
    return this.ProductsService.DeleteProductHanlder(+id)
  }

}
