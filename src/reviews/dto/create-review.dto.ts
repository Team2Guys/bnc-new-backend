import { IsDate, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateReviewDto {
    @IsOptional()
    posterImageUrl?: any

    @IsString()
    name: string

    @IsNumber()
    starRating: number

    @IsString()
    ReviewsDescription: string

    @IsString()
    reviewDate: string

    @IsOptional()
    ReviewsImages?: any[]

}



export class CreateRirectUrls {
    @IsString()
    url: string
    @IsString()
    redirectedUrl: string



}