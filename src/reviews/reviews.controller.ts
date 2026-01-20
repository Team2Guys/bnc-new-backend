import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateContactDto, CreateReviewDto, CreateRirectUrls, getUrls } from './dto/create-review.dto';
import { UpdateReviewDto, UpdateRirectUrls } from './dto/update-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}


  
  @Post("add_redirect")
  createRedirectUrl(@Body() CreateRirectUrls: CreateRirectUrls) {
    return this.reviewsService.createRedirectUrl(CreateRirectUrls);
  }



  @Get('get-all_redirects')
  findAllRedirectUrl() {
    return this.reviewsService.findAllRedirectUrl();
  }

  @Post('getRedirect')
  findOneRedirectUrls(@Body() getUrl: getUrls) {
    return this.reviewsService.findOneRedirectUrls(getUrl.url);
  }

  @Patch('update_Redirect')
  updateOneRedirectUrls(@Body() UpdateRirectUrls: UpdateRirectUrls) {
    return this.reviewsService.updateOneRedirectUrls( UpdateRirectUrls);
  }

  @Delete('delet/:id')
  removeRedirectUrls(@Param('id') id: string) {
    return this.reviewsService.removeRedirectUrls(+id);
  }


  
  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }

  @Patch('updated_reviews')
  update(@Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update( updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }



// Redirecturls


}
