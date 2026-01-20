import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsOptional()
  posterImageUrl?: any;

  @IsString()
  name: string;

  @IsNumber()
  starRating: number;

  @IsString()
  ReviewsDescription: string;

  @IsString()
  reviewDate: string;

  @IsOptional()
  ReviewsImages?: any[];
}

export class CreateRirectUrls {
  @IsString()
  url: string;
  @IsString()
  redirectedUrl: string;
}

export class getUrls {
  @IsString()
  url: string;
}

export class CreateContactDto {
  @IsString()
  fullName: string;

  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  whatsapp: string;

  @IsString()
  address: string;

  @IsString()
  message: string;

  @IsString()
  phone: string;
}
