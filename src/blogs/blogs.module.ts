import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtMiddleware } from '../utils/Authorization';

@Module({
  controllers: [BlogsController],
  providers: [BlogsService],
  imports:[PrismaModule],

})
// export class BlogsModule {}


export class BlogsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude({path: "blogs", method:RequestMethod.GET}, 
        {path: "blogs/get_blog/:id", method:RequestMethod.GET},
        {path: "blogs/addComments/:id", method:RequestMethod.POST},
        {path: "blogs/addReply/:id", method:RequestMethod.POST},
        {path: "blogs/comment/status/:id", method:RequestMethod.PATCH},
      
      )
      .forRoutes(BlogsController); 
  }
}