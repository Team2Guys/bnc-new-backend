import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { createCategorydto } from '../dto/category.dto';
import { Prisma } from '@prisma/client';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly CategoriesService: CategoriesService) {}
  @Get()
  getHello(): string {
    return this.CategoriesService.getHello();
  }

  @Post('AddCategory')
  addCategoryes(
    @Body() createCategorydto: Prisma.CategoriesCreateInput,
    @Req() req: Request,
  ) {
    return this.CategoriesService.AddcategoryHandler(createCategorydto, req);
  }

  @Delete('deleteCategory/:id')
  DeleteCategoryHandler(@Param('id') id: number) {
    return this.CategoriesService.DelCategoryhandle(+id);
  }

  @Get('findsingleCategory/:customUrl')
  findsingleCategory(@Param('customUrl') customUrl: string) {
    return this.CategoriesService.findsingleCategory(customUrl);
  }
  @Get('findsingleCategorymain/:customUrl')
  findsingleCategoryMain(@Param('customUrl') customUrl: string) {
    return this.CategoriesService.findsingleCategoryMain(customUrl);
  }

  @Put('updateCategory/:id')
  UpdateCategoryHanlder(
    @Param('id') id: number,
    @Body() updateCategoryDto: Prisma.CategoriesUpdateInput,
    @Req() req: Request,
  ) {
    console.log(updateCategoryDto);
    return this.CategoriesService.CategoryUpdateHandler(
      +id,
      updateCategoryDto,
      req,
    );
  }

  @Get('getAllCategories')
  getAllCategories() {
    return this.CategoriesService.getAllCategories();
  }

  // Sub Categories
  @Post('Addsubcategory')
  Addsubcategory(
    @Body() createCategorydto: Prisma.SubCategoriesCreateInput,
    @Req() req: Request,
  ) {
    return this.CategoriesService.AddsubCategoryHandler(createCategorydto, req);
  }

  @Delete('deletesubCategory/:id')
  deletesubCategory(@Param('id') id: number) {
    let convertedId = typeof id == 'string' ? parseInt(id) : id;
    return this.CategoriesService.DelsubCategoryhandle(convertedId);
  }

  @Put('updatesubCategory/:id')
  updatesubCategory(
    @Param('id') id: number,
    @Body() subCategory_update_data: Prisma.SubCategoriesUpdateInput,
    @Req() req: Request,
  ) {
    let convertedId = typeof id == 'string' ? parseInt(id) : id;
    console.log(subCategory_update_data, 'subCategory_update_data');
    return this.CategoriesService.UpdatesubCategoryhandle(
      convertedId,
      subCategory_update_data,
      req,
    );
  }

  @Get('get-all-subCategories')
  getAllsubCategories() {
    return this.CategoriesService.getsubAllCategories();
  }
}
