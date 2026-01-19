import { IsString, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

// Define the nested DTO within the same file
class ImageUrlDto {
  @IsString()
  readonly imageUrl: string ;

  @IsString()
  readonly public_id: string ;
}


export class createCategorydto {
  @IsString()
  readonly title: string;

  @ValidateNested()
  readonly posterImage: ImageUrlDto

}  
