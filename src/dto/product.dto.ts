import { IsString, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

// Define the nested DTO within the same file
class ImageUrlDto {
  @IsString()
  readonly imageUrl: string | any;

  @IsString()
  readonly public_id: string | any;
}



export class CreateProductDto {
  @IsString()
  readonly title: string;

  readonly category: any;

  @IsNumber()
  readonly price: number; 

  @IsOptional()
  @IsString()
  readonly description?: string;

  @ValidateNested({ each: true })
  @Type(() => ImageUrlDto)
  readonly imageUrls: ImageUrlDto[];

  
  @ValidateNested()
  @Type(()=>ImageUrlDto)
  readonly posterImage: ImageUrlDto

}  
