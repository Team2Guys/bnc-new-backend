import { Type } from 'class-transformer';
import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

export class GetProductDto {
  @IsOptional()
  subCategory?: any;

  @IsString()
  category: string;

  @IsString()
  Productname: string;

  @IsOptional()
  @IsObject() // ✅ ensure it's an object, not array/string
  fields?: Record<string, boolean>; // ✅ match Prisma `select` style
}
