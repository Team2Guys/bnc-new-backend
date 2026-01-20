import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtMiddleware } from '../utils/Authorization';

@Module({
  imports: [PrismaModule],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
// export class AppointmentModule {}
export class AppointmentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes({
        path: 'appointments/getAllappointments',
        method: RequestMethod.GET,
      });
  }
}
