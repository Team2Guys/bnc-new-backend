import { PartialType } from '@nestjs/swagger';
import { CreateReviewDto, CreateRirectUrls } from './create-review.dto';
import { IsNumber } from 'class-validator';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
  @IsNumber()
  id: number;
}

export class UpdateRirectUrls extends PartialType(CreateRirectUrls) {
  @IsNumber()
  id: number;
}
